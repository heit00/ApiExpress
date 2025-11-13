const connection = require("./connection");

const getAllPurchases =  async () => {
    const returnedPurchases = await connection.query("SELECT * FROM compra");
    return returnedPurchases.rows;
};

const createPurchase = async (purchase) => {
    const varSQL = "INSERT INTO compra (fk_usuario, data, acrescimo_total, sessao) VALUES ($1, $2, $3, $4) RETURNING *";
    const createdpurchase = await connection.query(varSQL, [purchase.fk_usuario, purchase.data, purchase.acrescimo_total, purchase.sessao]); 
    return createdpurchase.rows[0];
}

const deletePurchase = async (id) => {//aqui entra a semântica de cancelamento de compra ao invez de deletar alguma
    const varSQL = "UPDATE compra SET status = cancelado WHERE id_compra = $1";
    await connection.query(varSQL, [id]);
}

const updatePurchase = async(id, purchase) => {
    const realColumns = Object.keys(purchase);
    
    const varSQLstart = "UPDATE compra SET "; 
    const varSQLmid = realColumns.map((val, index) => { return `"${val}" = $${index + 1}`;}).join(', ');
    const realValues = realColumns.map(key => purchase[key]);
    const params = [...realValues, id];
    const varSQLend = ` WHERE id_compra = $${params.length} RETURNING *`;
    const varSQLcomplete = varSQLstart + varSQLmid + varSQLend;

    const updatedPurchase = await connection.query(varSQLcomplete, params);
    return updatedPurchase.rows;
}

module.exports = {
    getAllPurchases, 
    createPurchase,
    deletePurchase,
    updatePurchase
};