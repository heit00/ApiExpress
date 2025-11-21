const connection = require("./connection");

const getAllUsers =  async () => {
    const returnedUsers = await connection.query("SELECT * FROM usuario");
    return returnedUsers.rows;
};

const getUser = async (id) => {
    const varSQL = "SELECT id_usuario, nome , telefone, email FROM usuario WHERE id_usuario = $1";
    const returnedUser = await connection.query(varSQL, [id]);
    return returnedUser.rows[0];
}

const createUser = async (user) => {
    const varSQL = "INSERT INTO usuario (nome, senha, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *";
    const createdUser = await connection.query(varSQL, [user.nome, user.senha, user.telefone, user.email]); 
    return createdUser.rows[0];
}

const deleteUser = async (id) => {
    const varSQL = "UPDATE usuario SET excluido = true, data_exclusao = now() WHERE id_usuario = $1 RETURNING *";
    const deletedUser = await connection.query(varSQL, [id]);
    return deletedUser.rows[0];
}

//aqui, assumi que user  = obj{ nome, senha, admin, telefone, email}

const updateUser = async(id, user) => {

    const allowedColumns = ['nome', 'senha', 'admin', 'telefone', 'email'];
    const realColumns = Object.keys(user).filter(key => allowedColumns.includes(key));
    
    const varSQLstart = "UPDATE usuario SET "; 
    const varSQLmid = realColumns.map((val, index) => { return `"${val}" = $${index + 1}`;}).join(', ');
    const realValues = realColumns.map(key => user[key]);
    const params = [...realValues, id];
    const varSQLend = ` WHERE id_usuario = $${params.length} RETURNING *`;
    const varSQLcomplete = varSQLstart + varSQLmid + varSQLend;

    const updatedUser = await connection.query(varSQLcomplete, params);
    return updatedUser.rows[0];
}

module.exports = {
    getAllUsers, 
    createUser,
    deleteUser,
    updateUser,
    getUser
};