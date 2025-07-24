//handle routing for fetching of maps

//

const prisma = require("../prisma");

const { Router } = require("express");

const mapController = require("../controller/mapController");

const mapRouter = Router();

mapRouter.get("/", mapController.getMaps);

module.exports = mapRouter;
