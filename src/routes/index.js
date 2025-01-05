const express = require('express');
const produtos = require('./produtosRoutes.js');
const participantes = require('./participantesRoutes.js');
const estoque = require('./estoqueRoutes.js');
const movimentacoes = require('./movimentacaoRoutes.js')

const cors = require('cors');

const routes = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(produtos);
    app.use(participantes);
    app.use(estoque);
    app.use(movimentacoes);

    app.get('/', (req, res) => {
        res.status(200).send('Certificadora');
    });
};

module.exports = routes;