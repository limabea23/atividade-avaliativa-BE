const pool = require("../config/database");

const getAllPagamentos = async (valor) => {
    if (!valor) {
        const result = await pool.query(
            `SELECT pagamentos.*, contas.name AS contas_name 
            FROM pagamentos 
            LEFT JOIN contas ON pagamentos.conta_id = contas.id`
        );
        return result.rows; 
    } else {
        `SELECT pagamentos.*, contas.name AS contas_name
        FROM pagamentos
        LEFT JOIN contas ON pagamentos.conta_id = contas.id
        WHERE pagamentos.valor = ${valor}`
    }
};

const getPagamentoById = async (id) => {
    const result = await pool.query(
        `SELECT pagamentos.*, contas.nome AS contas_nome 
        FROM pagamentos 
        LEFT JOIN contas ON pagamentos.conta_id = contas.id 
        WHERE pagamentos.id = $1`,
    [id]
);
    return result.rows[0];
};

const createPagamento = async (descricao, data, valor, conta_id) => {
    const result = await pool.query(
    "INSERT INTO pagamentos (descricao, data, valor, conta_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [descricao, data, valor, conta_id]
);
    return result.rows[0];
};

const updatePagamento = async (id, descricao, data, valor, conta_id) => {
    const result = await pool.query(
    "UPDATE pagamentos SET descricao = $1, data = $2, valor = $3, conta_id = $4 WHERE id = $5 RETURNING *",
    [descricao, data, valor, conta_id, id]
);
return result.rows[0];
};

const deletePagamento = async (id) => {
    const result = await pool.query(
    "DELETE FROM pagamentos WHERE id = $1 RETURNING *",
    [id]
);

    if (result.rowCount === 0) {
    return { error: "pagamento não encontrado." };
}

    return { message: "pagamento deletado com sucesso." };
};

module.exports = { getAllPagamentos, getPagamentoById, createPagamento, updatePagamento, deletePagamento };