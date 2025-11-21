const validateFields = (request, response, next) => {
    const { body } = request

    if(typeof body !== 'object' || body === null || Array.isArray(body))
        return response.status(400).json({message:"body não respeita a estrutura da API"});

    const allowedColumns = ['fk_usuario', 'data', 'acrescimo_total', 'sessao','status'];
    const realColumns = Object.keys(body).filter(key => allowedColumns.includes(key));

    if (realColumns.length === 0) {
        return response.status(400).json({message:"Nenhum campo válido foi chamado"});
    }

    next();
    
}

const validateFieldsExtrict = async (request, response, next) => {
    const { body } = request

    if(typeof body !== 'object' || body === null || Array.isArray(body))
        return response.status(400).json({message:"body não respeita a estrutura da API"});

    const allowedColumns = ['fk_usuario', 'data', 'acrescimo_total', 'sessao'];
    const realColumns = Object.keys(body).filter(key => allowedColumns.includes(key));

    if (realColumns.length != 4) {
        return response.status(400).json({message:"Nenhum campo válido foi chamado"});
    }

    next();
}



module.exports = {
   validateFields , validateFieldsExtrict
}