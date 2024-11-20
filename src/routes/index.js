const express = require('express');
const produtos = require('./produtosRoutes.js');
const participantes = require('./participantesRoutes.js')
const cors = require('cors');

const routes = (app) => {
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    }));
    app.use(express.json());
    app.use(produtos);
    app.use(participantes);

    app.get('/', (req, res) => {
        res.status(200).send('Certificadora');
    });
};

module.exports = routes;