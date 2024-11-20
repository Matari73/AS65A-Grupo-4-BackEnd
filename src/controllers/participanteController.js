const Participante = require("../models/Participante.js");
class ParticipanteController {
    static async criarParticipante(req, res) {
        const { anonimo, nome, endereco, contato } = req.body;

        try {
            if (!anonimo && nome) {
                const participanteExiste = await Participante.findOne({ where: { nome } });
                if (participanteExiste) {
                    console.log("Participante já existe");
                    return res.status(400).json({ message: 'Participante já existe.' });
                }
            }

            const novoParticipante = await Participante.create({
                anonimo,
                nome: anonimo ? null : nome,
                endereco: anonimo ? null : endereco,
                contato: anonimo ? null : contato
            });

            console.log("Participante criado:", novoParticipante);
            res.status(201).json({ message: 'Participante criado com sucesso.' });
        } catch (error) {
            console.error("Erro ao criar participante:", error);
            res.status(500).json({ message: 'Erro ao criar participante.' });
        }
    }

    static async listarParticipantes(req, res) {
        try {
            const participantes = await Participante.findAll();
            res.status(200).json(participantes);
        } catch (error) {
            console.error('Erro ao buscar participantes:', error);
            res.status(500).json({ message: 'Erro ao buscar participantes.' });
        }
    }

    static async listarParticipantePorNome(req, res) {
        const { nome } = req.params;

        try {
            const participante = await Participante.findOne({ where: { nome } });
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado.' });
            }
            res.status(200).json(participante);
        } catch (error) {
            console.error(`Erro ao buscar o participante com nome '${nome}':`, error);
            res.status(500).json({ message: 'Erro ao buscar o participante.' });
        }
    }

    static async atualizarParticipantePorNome(req, res) {
        const { nome } = req.params;
        const { anonimo, endereco, contato } = req.body;

        try {
            const participante = await Participante.findOne({ where: { nome } });
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado.' });
            }

            await participante.update({
                anonimo,
                nome: anonimo ? null : participante.nome,
                endereco: anonimo ? null : endereco,
                contato: anonimo ? null : contato
            });

            res.status(200).json({ message: 'Participante atualizado com sucesso.', participante });
        } catch (error) {
            console.error(`Erro ao atualizar o participante com nome '${nome}':`, error);
            res.status(500).json({ message: 'Erro ao atualizar o participante.' });
        }
    }

    static async deletarParticipantePorNome(req, res) {
        const { nome } = req.params;

        try {
            const participante = await Participante.findOne({ where: { nome } });
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado.' });
            }

            await participante.destroy();
            res.status(200).json({ message: 'Participante deletado com sucesso.' });
        } catch (error) {
            console.error(`Erro ao deletar o participante com nome '${nome}':`, error);
            res.status(500).json({ message: 'Erro ao deletar o participante.' });
        }
    }
}

module.exports = ParticipanteController;