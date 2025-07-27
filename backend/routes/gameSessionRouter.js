const { Router } = require("express");

const gameSessionController = require("../controller/gameSessionController");

const gameSessionRouter = Router();

gameSessionRouter.post("/:mapId", gameSessionController.startSession);
gameSessionRouter.put("/:mapId", gameSessionController.endSession);

module.exports = gameSessionRouter;
