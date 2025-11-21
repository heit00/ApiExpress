const connection = require("./connection");

const getAllPurchases =  async () => {
    const returnedPurchases = await connection.query("SELECT * FROM compra");
    return returnedPurchases.rows;
};

const getPurchase = async (id) => {
    const varSQL = "SELECT * FROM compra WHERE id_compra = $1";
    const returnedPurchase = await connection.query(varSQL, [id]);
    return returnedPurchase.rows[0];
}

const createPurchase = async (purchase) => {
    const varSQL = "INSERT INTO compra (fk_usuario, data, acrescimo_total, sessao) VALUES ($1, $2, $3, $4) RETURNING *";
    const createdpurchase = await connection.query(varSQL, [purchase.fk_usuario, purchase.data, purchase.acrescimo_total, purchase.sessao]); 
    return createdpurchase.rows[0];
}

const deletePurchase = async (id) => {//aqui entra a semântica de cancelamento de compra ao invez de deletar alguma
    const varSQL = "UPDATE compra SET status = 'cancelado' WHERE id_compra = $1 RETURNING *";
    const deletedPurchase = await connection.query(varSQL, [id]);
    return deletedPurchase.rows[0];
}

const updatePurchase = async(id, purchase) => {
    
    const allowedColumns = ['fk_usuario', 'data', 'acrescimo_total', 'sessao', 'status'];
    const realColumns = Object.keys(purchase).filter(key => allowedColumns.includes(key));
    
    const varSQLstart = "UPDATE compra SET "; 
    const varSQLmid = realColumns.map((val, index) => { return `"${val}" = $${index + 1}`;}).join(', ');
    const realValues = realColumns.map(key => purchase[key]);
    const params = [...realValues, id];
    const varSQLend = ` WHERE id_compra = $${params.length} RETURNING *`;
    const varSQLcomplete = varSQLstart + varSQLmid + varSQLend;

    const updatedPurchase = await connection.query(varSQLcomplete, params);
    return updatedPurchase.rows[0];
}

module.exports = {
    getAllPurchases, 
    createPurchase,
    deletePurchase,
    updatePurchase,
    getPurchase
}