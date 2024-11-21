const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

class EstoqueController {
    static async listarEstoque(req, res) {
        try {
            const estoque = await Estoque.findAll({
                include: [{ model: Produto, attributes: ['nome', 'categoria'] }],
                attributes: ['id_estoque', 'quantidade_disponivel', 'updated_at'],
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
                attributes: ['id_estoque', 'quantidade_disponivel', 'updated_at'],
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
}

module.exports = EstoqueController;
