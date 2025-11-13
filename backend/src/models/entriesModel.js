const connection = require("./connection");

const getAllEntries =  async () => {
    const returnedEntries = await connection.query("SELECT * FROM entrada");
    return returnedEntries.rows;
};

const createEntry = async (entry) => {
    const varSQL = "INSERT INTO entrada (fk_produto, quantidade, obs, data_entrada, custo_unitario) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const createdEntry = await connection.query(varSQL, [entry.fk_produto, entry.quantidade, entry.obs, entry.data_entrada, entry.custo_unitario]); 
    return createdEntry.rows[0];
}

const deleteEntry = async (id) => {
    const varSQL = "DELETE FROM entrada WHERE id_entrada = $1 ";
    await connection.query(varSQL, [id]);
}

const updateEntry = async(id, entry) => {

    //const allowedColumns = ['descricao', 'nome', 'valor_unitario', 'imagem'];
    const realColumns = Object.keys(entry);//.filter(key => allowedColumns.includes(key));

    
    const varSQLstart = "UPDATE entrada SET "; 
    const varSQLmid = realColumns.map((val, index) => { return `"${val}" = $${index + 1}`;}).join(', ');
    const realValues = realColumns.map(key => entry[key]);
    const params = [...realValues, id];
    const varSQLend = ` WHERE id_entrada = $${params.length} RETURNING *`;
    const varSQLcomplete = varSQLstart + varSQLmid + varSQLend;

    const updatedEntry = await connection.query(varSQLcomplete, params);
    return updatedEntry.rows;
}

module.exports = {
    getAllEntries, 
    createEntry,
    deleteEntry,
    updateEntry
};