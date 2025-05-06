const PDFDocument = require("pdfkit");

const contaModel = require("../models/contaModel");

const exportBancoPDF = async (req, res) => {
    try {
        const conta =  await contaModel.getAllContas();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=banco.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

        //Titulo
        doc.fontSize(20).text("Relatorio da API: Banco", {align: "center"});
        doc.moveDown();

        //Cabeçalho
        doc.fontSize(12).text("Nome | Email | Senha", {underline: true});
        doc.moveDown(0.5);

        //Add dados das contas
        conta.forEach((conta) => {
            doc.text(
                `${conta.nome} | ${conta.email} | ${conta.senha} `
            );
        });

        doc.end(); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"}); 
    }
};

module.exports = { exportBancoPDF };