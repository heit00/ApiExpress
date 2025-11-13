const connection = require("./connection");

const getAllProducts =  async () => {
    const returnedProducts = await connection.query("SELECT * FROM produto");
    return returnedProducts.rows;
};

const createProduct = async (product) => {
    const varSQL = "INSERT INTO produto (descricao, nome, valor_unitario, imagem) VALUES ($1, $2, $3, $4) RETURNING *";
    const createdProduct = await connection.query(varSQL, [product.descricao, product.nome, product.valor_unitario, product.imagem]); 
    return createdProduct.rows[0];
}

const deleteProduct = async (id) => {
    const varSQL = "UPDATE produto SET excluido = true, data_exclusao = now() WHERE id_produto = $1 ";
    await connection.query(varSQL, [id]);
}

const updateProduct = async(id, product) => {

    //const allowedColumns = ['descricao', 'nome', 'valor_unitario', 'imagem'];
    const realColumns = Object.keys(product)//.filter(key => allowedColumns.includes(key));

    
    const varSQLstart = "UPDATE produto SET "; 
    const varSQLmid = realColumns.map((val, index) => { return `"${val}" = $${index + 1}`;}).join(', ');
    const realValues = realColumns.map(key => product[key]);
    const params = [...realValues, id];
    const varSQLend = ` WHERE id_produto = $${params.length} RETURNING *`;
    const varSQLcomplete = varSQLstart + varSQLmid + varSQLend;

    const updatedProduct = await connection.query(varSQLcomplete, params);
    return updatedProduct.rows;
}

module.exports = {
    getAllProducts, 
    createProduct,
    deleteProduct,
    updateProduct
};