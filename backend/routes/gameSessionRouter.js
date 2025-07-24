//handle routing for game sesson, i.e starting new game session on game start.

const prisma = require("../prisma");

const { Router } = require("express");

const gameSessionController = require("../controller/gameSessionController");

const gameSessionRouter = Router();

gameSessionRouter.post("/", gameSessionController.startSession);
gameSessionRouter.put("/", gameSessionController.endSession);

module.exports = gameSessionRouter;
