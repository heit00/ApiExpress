const connection = require("./connection");

const getAllEntries =  async () => {
    const returnedEntries = await connection.query("SELECT * FROM entrada");
    return returnedEntries.rows;
};

const getEntry = async (id) => {
    const varSQL = "SELECT * FROM entrada WHERE id_entrada = $1";
    const returnedEntry = await connection.query(varSQL, [id]);
    return returnedEntry.rows[0];
}


const createEntry = async (entry) => {
    const varSQL = "INSERT INTO entrada (fk_produto, quantidade, obs, data_entrada, custo_unitario) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const createdEntry = await connection.query(varSQL, [entry.fk_produto, entry.quantidade, entry.obs, entry.data_entrada, entry.custo_unitario]); 
    return createdEntry.rows[0];
}

const deleteEntry = async (id) => {
    const varSQL = "DELETE FROM entrada WHERE id_entrada = $1 RETURNING *";
    const deletedEntry = await connection.query(varSQL, [id]);
    return deletedEntry.rows[0];
}

const updateEntry = async(id, entry) => {

    const allowedColumns = ['fk_produto', 'quantidade', 'obs', 'data_entrada', 'custo_unitario'];
    const realColumns = Object.keys(entry).filter(key => allowedColumns.includes(key));

    const varSQLstart = "UPDATE entrada SET "; 
    const varSQLmid = realColumns.map((val, index) => { return `"${val}" = $${index + 1}`;}).join(', ');
    const realValues = realColumns.map(key => entry[key]);
    const params = [...realValues, id];
    const varSQLend = ` WHERE id_entrada = $${params.length} RETURNING *`;
    const varSQLcomplete = varSQLstart + varSQLmid + varSQLend;

    const updatedEntry = await connection.query(varSQLcomplete, params);
    return updatedEntry.rows[0];
}

module.exports = {
    getAllEntries, 
    createEntry,
    deleteEntry,
    updateEntry,
    getEntry
};