const contaModel = require("../models/contaModel");

const getAllContas = async (req, res) => {
    try {
        const contas = await contaModel.getAllContas();
        res.json(contas);
    } catch (error) {
        res.status(500).json({ message: "erro ao buscar contas." });
    }
};

const getConta = async (req, res) => {
    try {
        const conta = await contaModel.getContaById(req.params.id);
        if (!conta) {
            return res.status(404).json({ message: "conta não encontrada." });
        }
        res.json(conta);
    } catch (error) {
        res.status(500).json({ message: "erro ao buscar conta." });
    }
};

const createConta = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const newConta = await contaModel.createConta(nome, email, senha);
        res.status(201).json(newConta);
    } catch (error) {
	console.log(error);
        if (error.code === "23505") { // Código de erro do PostgreSQL para chave única violada
            return res.status(400).json({ message: "conta já cadastrada." });
        }
        res.status(500).json({ message: "erro ao criar conta." });
    }
};

const updateConta = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const updatedConta = await contaModel.updateConta(req.params.id, nome, email, senha);
        if (!updatedConta) {
            return res.status(404).json({ message: "conta não encontrada." });
        }
        res.json(updatedConta);
    } catch (error) {
        res.status(500).json({ message: "erro ao atualizar conta." });
    }
};

const deleteConta = async (req, res) => {
    try {
        const message = await contaModel.deleteConta(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "erro ao deletar conta." });
    }
};

module.exports = { getAllContas, getConta, createConta, updateConta, deleteConta };