const express = require('express');
const MovimentacaoController = require("../controllers/movimentacaoController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const routes = express.Router()

routes.post('/movimentacoes', authMiddleware, MovimentacaoController.criarMovimentacao)
routes.get('/movimentacoes', authMiddleware, MovimentacaoController.listarTodasMovimentacoes);
routes.get('/movimentacoes/produto/:nome', authMiddleware, MovimentacaoController.listarMovimentacoesPorNomeProduto);
routes.get('/movimentacoes/responsavel/:nome', authMiddleware, MovimentacaoController.listarMovimentacoesPorNomeResponsavel);
routes.get('/movimentacoes/tipo/:tipo_movimentacao', authMiddleware, MovimentacaoController.listarMovimentacoesPorTipo);
routes.get('/movimentacoes/participante/:nome', authMiddleware, MovimentacaoController.listarMovimentacoesPorNomeParticipante);

module.exports = routes;