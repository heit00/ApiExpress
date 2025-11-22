class AppError extends Error{
    status;
    detail;

    constructor(message, status, detail){
        super(message);
        this.status = status;
        this.detail = detail;
    }
}

const errorMap = {
    '23505': { message: 'Registro já existe.', status: 409 },
    '23503': { message: 'Registro relacionado não encontrado.', status: 403 },
    '23502': { message: 'Campo obrigatório ausente.', status: 400 },
    '22P02': { message: 'Formato de dado inválido.', status: 400 },
    '42601': { message: 'Nenhum campo válido foi chamado.', status: 400}
};

const executeBdActionAsync = async (callback) => {
    if(typeof callback !== 'function')
        throw new Error('callback Arg deve ser uma função em executeBdAction:callback');

    try{
       return await callback();
    }

    catch(err){
        console.log(">>>>>>>>>>>>>>>>>>>>ERROR HANDLE: " + err.message);
        const error = errorMap[err.code]
        if(error)
            throw new AppError(error.message, error.status);
        else
            throw new AppError("Erro interno.", 500);
    }
}
   
module.exports = {AppError, executeBdActionAsync};
