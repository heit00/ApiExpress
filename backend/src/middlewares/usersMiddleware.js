const passwordCheckExtrict = (request, response, next, extrict = true) => {
    const { body } = request;
    if(extrict && (!body.senha || body.senha.length < 8 || body.senha.length > 16))
        return response.status(400).json({message:"Senha com tamanho invalido PRECISA ESTAR ENTRE 8 e 16"});

    next();
}

const passwordCheck = (request, response, next) => {
    const { body } = request;
    if(body.senha && (!body.senha || body.senha.length < 8 || body.senha.length > 16))
        return response.status(400).json({message:"Senha com tamanho invalido PRECISA ESTAR ENTRE 8 e 16"});

    next();
}

const validateFields = (request, response, next) => {
    const { body } = request;

    if(typeof body !== 'object' || body === null || Array.isArray(body))
        return response.status(400).json({message:"body não respeita a estrutura da API"});

    const allowedColumns = ['nome', 'senha', 'admin', 'telefone', 'email', 'excluido'];
    const realColumns = Object.keys(body).filter(key => allowedColumns.includes(key));

    if (realColumns.length === 0) {
        return response.status(400).json({message:"Nenhum campo válido foi chamado"});
    }

    next();
    
}

const validateFildsToMyself = (request, response, next) => {
    const { body } = request;

    if(typeof body !== 'object' || body === null || Array.isArray(body))
        return response.status(400).json({message:"body não respeita a estrutura da API"});

    const allowedColumns = ['nome', 'senha', 'telefone', 'email'];
    const realColumns = Object.keys(body).filter(key => allowedColumns.includes(key));

    if (realColumns.length === 0) {
        return response.status(400).json({message:"Nenhum campo válido foi chamado"});
    }

    next();
}

const validateFieldsExtrict = async (request, response, next) => {
    const { body } = request;

    if(typeof body !== 'object' || body === null || Array.isArray(body))
        return response.status(400).json({message:"body não respeita a estrutura da API"});

    const allowedColumns = ['nome', 'senha', 'telefone', 'email'];
    const realColumns = Object.keys(body).filter(key => allowedColumns.includes(key));

    if (realColumns.length != 4) {
        return response.status(400).json({message:"Nenhum campo válido foi chamado"});
    }

    next();
}


module.exports = {
   validateFields , validateFieldsExtrict, passwordCheckExtrict, passwordCheck, validateFildsToMyself
}