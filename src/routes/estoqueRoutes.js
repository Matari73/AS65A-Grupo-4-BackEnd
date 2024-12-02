const express = require('express');
const EstoqueController = require('../controllers/estoqueController');
const router = express.Router();

router.post('/estoque', EstoqueController.atualizarEstoque);
router.get('/estoque', EstoqueController.listarEstoque);
router.get('/estoque/:nome', EstoqueController.buscarEstoquePorProduto);

module.exports = router;
