const validateFields = (request, response, next) => {
    const { body } = request

    if(typeof body !== 'object' || body === null || Array.isArray(body))
        return response.status(400).json({message:"body não respeita a estrutura da API"});

    const allowedColumns = ['quantidade', 'valor_unitario'];
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

    const allowedColumns = ['fk_produto','quantidade', 'valor_unitario'];
    const realColumns = Object.keys(body).filter(key => allowedColumns.includes(key));

    if (realColumns.length != 3) {
        return response.status(400).json({message:"Nenhum campo válido foi chamado"});
    }

    next();
}


module.exports = {
   validateFields , validateFieldsExtrict
}