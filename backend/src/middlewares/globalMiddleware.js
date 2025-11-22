const { AppError } = require('../controllers/globalController');
const bcrypt  = require('bcrypt');
const connection = require('../models/connection');
const jwt = require('jsonwebtoken');
const { executeBdActionAsync:executeAct } = require('../controllers/globalController');
const usersModel = require('../models/usersModel');


const showError = (err, _request, response, _next)=>{
    console.log(err, _next);
    return response.status(err.status || 500).json({message: err.message || "Erro interno."});
}

const login = async (request, response, next) => {
    const body = request.body;
    if(!body?.senha || !body?.email){
        next(new AppError("Senha ou Email faltando no body.", 400));
        return;
    }
    try{
        const result = await executeAct(() => connection.query("SELECT nome, senha, email, admin, id_usuario, excluido FROM usuario WHERE email = $1", [body.email])); 
        const testUser = result.rows[0];
        console.log(testUser)
        if(!testUser)
            throw new AppError(`Email ou Senha incorretos.`, 401);
        if(testUser.excluido == true)
            throw new AppError('Usuário excluído, crie outro.', 401);
        if(await bcrypt.compare(body.senha, testUser.senha)){

            const token = jwt.sign(
                {
                    nome: testUser.nome,
                    id:testUser.id_usuario,
                    acesso: testUser.admin == '1' ? 'admin' : 'usuario',
                    email: testUser.email.toLowerCase()
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );


            
            return response.status(200).json({ 
                message: "Login realizado com sucesso.",
                token: token,
                id: testUser.id_usuario 
            });
        }
        else
            throw new AppError(`Email ou Senha incorretos.`, 401);
    }
    catch(err){
        next(err);
        return;
    }
}

const isDeleted =  async (request, response, next) => {
    try{
        const { id } = request.user;
        const user = await executeAct(()=> usersModel.getUser(id));
        if(!user)
            throw new AppError(`O usuário de ID ${id} Não existe.`,404);
        if(user.excluido == true)
            throw new AppError('Usuário excluido, crie outra conta.', 401);
        next();
        return;
    }
    catch(err){
        next(err);
        return;
    }
}

const injectUserId = (columnName) => {
    return (request, response, next) => {
        try{
            //if(!request.user)
                //throw new AppError("O usuário precisa estar autenticado.", 401);
            if(request.user.acesso !== 'admin'){
                request.body[columnName] = request.user.id;
                next();
                return;
            }
            next();
        }
        catch(err){
            next(err);
            return;
        }
       
    }
}

const verifyParamsToMySelf = (paramName) => {
    return (request, response, next) => {
        try{
            //if(!request.user)
                //throw new AppError("Usuário precisa estar autenticado.", 401);
            if(request.user.acesso !== 'admin'){
                if(request.params[paramName] != request.user.id)
                    throw new AppError("Acesso negado.", 403);
                next();
                return;
            }
            next();
            return;
        }
        catch(err){
            next(err);
            return;
        }
        
    }
}

const verifyToken =  (request, _response, next)=> {
    try{
        if(!request.header('Authorization'))
            throw new AppError('É necessário se autenticar utilizando um token.', 401);

        const token = request.header('Authorization').split(' ')[1];
        
        if(!token)
            throw new AppError("É necessário fornecer um TOKEN.", 401);
            

        const user = jwt.verify(token, process.env.JWT_SECRET);
        request.user = user;
        next();
        return;
    }
    catch(err){
        console.log("TRY-TOKEN-ACESS: " + err.message);
        if (err.name === 'TokenExpiredError') {
            next(new AppError('Sua sessão expirou, faça login novamente.', 401));
            return;
        }
        
        if (err.name === 'JsonWebTokenError') {
            next(new AppError('Token inválido ou adulterado.', 401));
            return;
        }

        else{
            next(err);
            return;
        }
    }
}

const verifyAdmin = (request,response, next) => {
    try{
        //if (!request.user) 
            //throw new AppError("Usuário não autenticado.", 401);
        
        if(request.user.acesso !== 'admin')
            throw new AppError("Um erro ocorreu", 403);
        
        next();
    }
    catch(err){
        next(err);
        return;
    }
}

const injectValidateFk = (tableName, targetName, primaryKey, extrict = true) => {
    return async (request, response, next) => {
        try{
            //if(!request.user)
                //throw new AppError("O usuário precisa estar autenticado.", 403);
            if(request.user.acesso !== 'admin'){
                const varSQL = `SELECT ${targetName} FROM ${tableName} WHERE ${primaryKey} = $1`;
                const returned = await executeAct(()=> connection.query(varSQL, [request.params.id])) ;
                const tReturned = returned.rows[0];
                if((returned.rowCount == 0 || tReturned[targetName] != request.user.id) && extrict)
                    throw new AppError(`Erro ao acessar ${tableName}.`, 403);
                else if(returned.rowCount == 0 || tReturned[targetName] != request.user.id)
                    throw new AppError(`Recurso de ID ${request.params.id} Não encontrado.`,404);
                next();
                return;
            }
            next();
            return;
        }
        catch(err){
            next(err);
            return;
        }
    };
}

module.exports = { showError, login, verifyToken, verifyAdmin, injectUserId, verifyParamsToMySelf, injectValidateFk, isDeleted };