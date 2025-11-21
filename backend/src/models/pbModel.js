const connection = require("./connection");

const getAllPb =  async () => {
    const returnedPb = await connection.query("SELECT * FROM compra_produto");
    return returnedPb.rows;
};

const getPb = async (id) => {
    const varSQL = "SELECT * FROM compra_produto WHERE fk_compra = $1 AND fk_produto = $2";
    const returnedPb = await connection.query(varSQL, [id.fc, id.fp]);
    return returnedPb.rows[0];
}

const createPb = async (pb) => {
    const varSQL = "INSERT INTO compra_produto (fk_produto, fk_compra, quantidade, valor_unitario) VALUES ($1, $2, $3, $4) RETURNING *";
    const createdPb = await connection.query(varSQL, [pb.fk_produto, pb.fk_compra, pb.quantidade, pb.valor_unitario]); 
    return createdPb.rows[0];
}

const deletePb = async (id) => {
    const varSQL = "DELETE FROM compra_produto WHERE fk_produto = $1 AND fk_compra = $2 RETURNING *";
    const deletedPb = await connection.query(varSQL, [id.fp, id.fc]);
    return deletedPb.rows[0];
}

const updatePb = async(id, pb) => {

    const allowedColumns = ['quantidade', 'valor_unitario'];
    const realColumns = Object.keys(pb).filter(key => allowedColumns.includes(key));

    const varSQLstart = "UPDATE compra_produto SET "; 
    const varSQLmid = realColumns.map((val, index) => { return `"${val}" = $${index + 1}`;}).join(', ');
    const realValues = realColumns.map(key => pb[key]);
    const params = [...realValues, id.fp, id.fc];
    const varSQLend = ` WHERE fk_produto = $${params.length - 1} AND fk_compra = $${params.length} RETURNING *`;
    const varSQLcomplete = varSQLstart + varSQLmid + varSQLend;

    const updatedPb = await connection.query(varSQLcomplete, params);
    return updatedPb.rows[0];
}

module.exports = {
    getAllPb, 
    createPb,
    deletePb,
    updatePb,
    getPb
};