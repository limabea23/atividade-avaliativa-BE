const express = require("express");
const router = express.Router();
const pagamentoController = require("../controllers/pagamentoController");

router.get("/pagamento", pagamentoController.getAllPagamentos);
router.get("/Pagamento/:id", pagamentoController.getPagamento);
router.post("/pagamento", pagamentoController.createPagamento);
router.put("/pagamento/:id", pagamentoController.updatePagamento);
router.delete("/pagamento/:id", pagamentoController.deletePagamento);

module.exports = router;