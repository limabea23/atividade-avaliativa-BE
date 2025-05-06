const express = require("express");
const router = express.Router();
const contaController = require("../controllers/contaController");
const upload = require("../config/upload.js");

router.get("/conta", contaController.getAllContas);
router.get("/conta/:id", contaController.getConta);
router.post("/conta", upload.single("photo"), contaController.createConta);
router.put("/conta/:id", contaController.updateConta);
router.delete("/conta/:id", contaController.deleteConta);

module.exports = router;