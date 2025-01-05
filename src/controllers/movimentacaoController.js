const MovimentacaoProduto = require('../models/MovimentacaoProduto');
const Produto = require('../models/Produto');
const Participante = require('../models/Participante');
const Usuario = require('../models/Usuario');
const Estoque = require('../models/Estoque');
const EstoqueController = require('../controllers/estoqueController.js');
const { sequelize } = require('../db/db');

class MovimentacaoController {
    static async criarMovimentacao(req, res) {
        const { tipo_movimentacao, quantidade, nome_responsavel, nome_produto, nome_participante } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { nome: nome_responsavel } });
            if (!usuario) {
                return res.status(404).json({ message: 'Responsável não encontrado.' });
            }

            const produto = await Produto.findOne({ where: { nome: nome_produto } });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            const participante = await Participante.findOne({ where: { nome: nome_participante } });
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado.' });
            }

            const estoqueAtualizado = await EstoqueController.atualizarEstoqueInterno(produto.id_produto, quantidade, tipo_movimentacao);

            if (!estoqueAtualizado) {
                return res.status(400).json({ message: 'Erro ao atualizar o estoque.' });
            }

            const movimentacao = await MovimentacaoProduto.create({
                tipo_movimentacao,
                quantidade,
                id_usuario: usuario.id_usuario,
                id_produto: produto.id_produto,
                id_participante: participante.id_participante,
            });

            return res.status(201).json({
                message: 'Movimentação criada com sucesso.',
                movimentacao
            });
        } catch (error) {
            console.error('Erro ao criar movimentação:', error);
            return res.status(500).json({ message: 'Erro ao criar movimentação.' });
        }
    }

    static async listarTodasMovimentacoes(req, res) {
        try {
            const movimentacoes = await MovimentacaoProduto.findAll({
                include: [
                    { model: Produto },
                    { model: Usuario },
                    { model: Participante },
                ],
            });
            res.status(200).json(movimentacoes);
        } catch (error) {
            console.error('Erro ao listar todas as movimentações:', error);
            res.status(500).json({ message: 'Erro ao listar movimentações.' });
        }
    }

    static async listarMovimentacoesPorNomeProduto(req, res) {
        const { nome } = req.params;
        try {
            const movimentacoes = await MovimentacaoProduto.findAll({
                include: [
                    {
                        model: Produto,
                        where: { nome },

                    },
                    { model: Usuario },
                    { model: Participante },
                ],
            });
            res.status(200).json(movimentacoes);
        } catch (error) {
            console.error('Erro ao listar movimentações por produto:', error);
            res.status(500).json({ message: 'Erro ao listar movimentações.' });
        }
    }

    static async listarMovimentacoesPorNomeResponsavel(req, res) {
        const { nome } = req.params;
        try {
            const movimentacoes = await MovimentacaoProduto.findAll({
                include: [
                    {
                        model: Usuario,
                        where: { nome },

                    },
                    { model: Produto },
                    { model: Participante },
                ],
            });
            res.status(200).json(movimentacoes);
        } catch (error) {
            console.error('Erro ao listar movimentações por responsável:', error);
            res.status(500).json({ message: 'Erro ao listar movimentações.' });
        }
    }

    static async listarMovimentacoesPorNomeParticipante(req, res) {
        const { nome } = req.params;
        try {
            const movimentacoes = await MovimentacaoProduto.findAll({
                include: [
                    {
                        model: Participante,
                        where: { nome },

                    },
                    { model: Produto },
                    { model: Usuario },
                ],
            });
            res.status(200).json(movimentacoes);
        } catch (error) {
            console.error('Erro ao listar movimentações por responsável:', error);
            res.status(500).json({ message: 'Erro ao listar movimentações.' });
        }
    }

    static async listarMovimentacoesPorTipo(req, res) {
        const { tipo_movimentacao } = req.params;
        try {
            const movimentacoes = await MovimentacaoProduto.findAll({
                where: { tipo_movimentacao },
                include: [
                    { model: Produto },
                    { model: Usuario },
                    { model: Participante },
                ],
            });
            res.status(200).json(movimentacoes);
        } catch (error) {
            console.error('Erro ao listar movimentações por tipo:', error);
            res.status(500).json({ message: 'Erro ao listar movimentações.' });
        }
    }
}

module.exports = MovimentacaoController;
