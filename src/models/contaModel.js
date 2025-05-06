const pool = require("../config/database");

const getAllContas = async () => {
    const result = await pool.query("SELECT * FROM contas");
    return result.rows;
};

const getContaById = async (id) => {
    const result = await pool.query("SELECT * FROM contas WHERE id = $1", [id]);
    return result.rows[0];
};

const createConta = async (nome, email, senha) => {
    const result = await pool.query(
        "INSERT INTO contas (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
        [nome, email, senha]
    );
    return result.rows[0];
};

const updateConta = async (id, nome, email, senha) => {
    const result = await pool.query(
        "UPDATE contas SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *",
        [nome, email, senha, id]
    );
    return result.rows[0];
};

const deleteConta = async (id) => {
    const result = await pool.query("DELETE FROM contas WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "conta não encontrada." };
    }

    return { message: "conta deletada com sucesso." };
};

module.exports = { getAllContas, getContaById, createConta, updateConta, deleteConta };