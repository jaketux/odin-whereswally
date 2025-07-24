const { Router } = require("express");

const gameSessionController = require("../controller/gameSessionController");

const gameSessionRouter = Router();

gameSessionRouter.post("/", gameSessionController.startSession);
gameSessionRouter.put("/", gameSessionController.endSession);

module.exports = gameSessionRouter;
