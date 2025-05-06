const pagamentoModel = require("../models/pagamentoModel");

const getAllPagamentos = async (req, res) => {
    try {
        const { valor } = req.query;
        const pagamentos = await pagamentoModel.getAllPagamentos(valor);
        res.json(pagamentos);
    } catch (error) {
        res.status(500).json({ message: "erro ao buscar pagamentos." });
    }
};

const getPagamento = async (req, res) => {
    try {
        const pagamentos = await pagamentoModel.getPagamentoById(req.params.id);
        if (!pagamentos) {
            return res.status(404).json({ message: "pagamento não encontrado." });
        }
        res.json(pagamentos);
    } catch (error) {
        res.status(500).json({ message: "erro ao buscar pagamento." });
    }
};

const createPagamento = async (req, res) => {
    try {
        const { descricao, data, valor, conta_id } = req.body;
        const newpagamento = await pagamentoModel.createPagamento(descricao, data, valor, conta_id);
        res.status(201).json(newpagamento);
    } catch (error) {
        res.status(500).json({ message: "erro ao criar pagamento." });
    }
};

const updatePagamento = async (req, res) => {
    try {
        const { descricao, data, valor, conta_id } = req.body;
        const updatedPagamento = await pagamentoModel.updatePagamento(req.params.id, descricao, data, valor, conta_id);
        if (!updatedPagamento) {
            return res.status(404).json({ message: "pagamento não encontrado." });
        }
        res.json(updatedPagamento);
    } catch (error) {
        res.status(500).json({ message: "erro ao atualizar pagamento." });
    }
};

const deletePagamento = async (req, res) => {
    try {
        const message = await pagamentoModel.deletePagamento(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "erro ao deletar pagamento." });
    }
};

module.exports = { getAllPagamentos, getPagamento, createPagamento, updatePagamento, deletePagamento };