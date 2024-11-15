const express = require('express');
const ProdutoController = require("../controllers/produtoController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const routes = express.Router()

routes.post("/produto", authMiddleware, ProdutoController.criarProduto)
routes.get("/produto", authMiddleware, ProdutoController.listarProdutos)
routes.get("/produto/:id", authMiddleware, ProdutoController.listarProdutoPorId)
routes.put("/produto/:id", authMiddleware, ProdutoController.atualizarProduto)
routes.delete("/produto/:id", authMiddleware, ProdutoController.deletarProduto)


module.exports = routes;