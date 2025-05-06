require("dotenv").config();
const express = require("express");
const cors = require("cors");
const contaRoutes = require("./src/routes/contaRoutes.js");
const pagamentoRoutes = require("./src/routes/pagamentoRoutes.js");
const path = require("path");
const apiKeyMiddleware = require('./src/config/apiKey.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(apiKeyMiddleware);

app.use("/api", contaRoutes); 
app.use("/api", pagamentoRoutes); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Suuucessoooo, servidor rodando na porta ${PORT} 💗🌟🤠💋`);
});