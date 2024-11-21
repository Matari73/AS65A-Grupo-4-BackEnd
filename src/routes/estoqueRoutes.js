const express = require('express');
const EstoqueController = require('../controllers/estoqueController');
const router = express.Router();

router.get('/estoque', EstoqueController.listarEstoque);
router.get('/estoque/:nome', EstoqueController.buscarEstoquePorProduto);

module.exports = router;
