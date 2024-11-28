const MovimentacaoProduto = require('../models/MovimentacaoProduto');
const Produto = require('../models/Produto');
const Participante = require('../models/Participante');
const Usuario = require('../models/Usuario');
const Estoque = require('../models/Estoque');
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

            let estoque = await Estoque.findOne({ where: { id_produto: produto.id_produto } });
            if (!estoque) {
                if (tipo_movimentacao === 'entrada') {
                    estoque = await Estoque.create({
                        id_produto: produto.id_produto,
                        quantidade_disponivel: quantidade,
                    });
                } else {
                    return res.status(400).json({ message: 'Estoque não encontrado e tipo de movimentação inválido para saída.' });
                }
            } else {
                if (tipo_movimentacao === 'entrada') {
                    estoque.quantidade_disponivel += quantidade;
                } else if (tipo_movimentacao === 'saida') {
                    if (estoque.quantidade_disponivel < quantidade) {
                        return res.status(400).json({ message: 'Estoque insuficiente para a saída.' });
                    }
                    estoque.quantidade_disponivel -= quantidade;
                } else {
                    return res.status(400).json({ message: 'Tipo de movimentação inválido.' });
                }
            }

            await estoque.save();

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
                    { model: Produto, attributes: ['nome'] },
                    { model: Usuario, attributes: ['nome'] },
                    { model: Participante, attributes: ['nome'] },
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
                        attributes: ['nome']
                    },
                    { model: Usuario, attributes: ['nome'] },
                    { model: Participante, attributes: ['nome'] },
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
                        attributes: ['nome']
                    },
                    { model: Produto, attributes: ['nome'] },
                    { model: Participante, attributes: ['nome'] },
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
                        attributes: ['nome']
                    },
                    { model: Produto, attributes: ['nome'] },
                    { model: Usuario, attributes: ['nome'] },
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
                    { model: Produto, attributes: ['nome'] },
                    { model: Usuario, attributes: ['nome'] },
                    { model: Participante, attributes: ['nome'] },
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
