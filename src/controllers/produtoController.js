const Produto = require("../models/Produto.js");

class ProdutoController {
    static async criarProduto(req, res) {
        const { nome, categoria } = req.body;
        try {
            const produtoExiste = await Produto.findOne({ where: { nome } });
            if (produtoExiste) {
                return res.status(400).json({ message: 'Produto já existe.' });
            }

            const novoProduto = await Produto.create({
                nome,
                categoria,
            });
            console.log("Produto criado:", novoProduto);
            res.status(201).json({ message: 'Produto criado com sucesso.' });
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).json({ message: 'Erro ao criar produto.' });
        }
    }
    static async listarProdutos(req, res) {
        try {
            const produtos = await Produto.findAll();
            console.log(produtos)
            res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
    };

    static async listarProdutoPorId(req, res) {
        const { id_produto } = req.params;

        try {
            const produto = await Produto.findByPk(id_produto);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            res.status(200).json(produto);
        } catch (error) {
            console.error('Erro ao buscar o produto:', error);
            res.status(500).json({ message: 'Erro ao buscar o produto.' });
        }
    }

    static async atualizarProduto(req, res) {
        const { id_produto } = req.params;
        const { nome, categoria } = req.body;

        try {
            const produto = await Produto.findByPk(id_produto);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            await produto.update({
                nome,
                categoria,
            });

            res.status(200).json({ message: 'Produto atualizado com sucesso.', produto });
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            res.status(500).json({ message: 'Erro ao atualizar o produto.' });
        }
    }

    static async deletarProduto(req, res) {
        const { id_produto } = req.params;
        try {
            const produto = await Produto.findByPk(id_produto);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            await produto.destroy();
            res.status(200).json({ message: 'Produto deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
            res.status(500).json({ message: 'Erro ao deletar o produto.' });
        }
    }
}

module.exports = ProdutoController;