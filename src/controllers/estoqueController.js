const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

class EstoqueController {
    static async listarEstoque(req, res) {
        try {
            const estoque = await Estoque.findAll({
                include: [{ model: Produto }],
            });

            if (estoque.length === 0) {
                return res.status(200).json({ message: 'Estoque vazio', totalProdutos: 0 });
            }

            const totalProdutos = estoque.reduce((total, item) => total + item.quantidade_disponivel, 0);

            const listaEstoque = estoque.map(item => ({
                nome: item.Produto.nome,
                categoria: item.Produto.categoria,
                quantidade_disponivel: item.quantidade_disponivel,
            }));

            res.status(200).json({ totalProdutos, listaEstoque });
        } catch (error) {
            console.error('Erro ao buscar estoque:', error);
            res.status(500).json({ message: 'Erro ao buscar estoque.' });
        }
    }

    static async buscarEstoquePorProduto(req, res) {
        const { nome } = req.params;
        try {
            const produto = await Produto.findOne({ where: { nome } });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            const estoque = await Estoque.findOne({
                where: { id_produto: produto.id_produto },
            });

            if (!estoque) {
                return res.status(404).json({ message: 'Estoque para o produto não encontrado.' });
            }

            res.status(200).json({
                produto: { nome: produto.nome, categoria: produto.categoria },
                quantidade_disponivel: estoque.quantidade_disponivel,
                atualizado_em: estoque.updated_at,
            });
        } catch (error) {
            console.error('Erro ao buscar estoque por produto:', error);
            res.status(500).json({ message: 'Erro ao buscar estoque por produto.' });
        }
    }

    static async atualizarEstoque(req, res) {
        const { id_produto, quantidade } = req.body;
        try {
            let estoque = await Estoque.findOne({ where: { id_produto } });

            if (!estoque) {
                estoque = await Estoque.create({
                    id_produto,
                    quantidade_disponivel: quantidade
                });
                return res.status(201).json({ message: 'Estoque criado com sucesso.', estoque });
            }

            estoque.quantidade_disponivel += quantidade;
            await estoque.save();
            return res.status(200).json({ message: 'Estoque atualizado com sucesso.', estoque });
        } catch (error) {
            console.error('Erro ao atualizar estoque:', error);
            return res.status(500).json({ message: 'Erro ao atualizar estoque.' });
        }
    }

    static async atualizarEstoqueInterno(id_produto, quantidade, tipo_movimentacao) {
        try {
            let estoque = await Estoque.findOne({ where: { id_produto } });

            if (!estoque) {
                if (tipo_movimentacao === 'entrada') {
                    estoque = await Estoque.create({
                        id_produto,
                        quantidade_disponivel: quantidade,
                    });
                    return estoque;
                } else {
                    return null; // Não permitir saída sem estoque
                }
            }

            if (tipo_movimentacao === 'entrada') {
                estoque.quantidade_disponivel += quantidade;
            } else if (tipo_movimentacao === 'saida') {
                if (estoque.quantidade_disponivel < quantidade) {
                    return null; // Estoque insuficiente
                }
                estoque.quantidade_disponivel -= quantidade;
            }

            await estoque.save();
            return estoque;
        } catch (error) {
            console.error('Erro ao atualizar estoque internamente:', error);
            return null;
        }
    }
}

module.exports = EstoqueController;
