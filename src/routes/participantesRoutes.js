const express = require('express');
const ParticipanteController = require("../controllers/participanteController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const routes = express.Router()

routes.post("/participante", authMiddleware, ParticipanteController.criarParticipante)
routes.get("/participante", authMiddleware, ParticipanteController.listarParticipantes)
routes.get("/participante/:nome", authMiddleware, ParticipanteController.listarParticipantePorNome)
routes.put("/participante/:nome", authMiddleware, ParticipanteController.atualizarParticipantePorNome)
routes.delete("/participante/:nome", authMiddleware, ParticipanteController.deletarParticipantePorNome
)

module.exports = routes;