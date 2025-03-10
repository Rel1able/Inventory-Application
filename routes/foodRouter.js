const { Router } = require("express");
const foodController = require("../controllers/foodController");
const foodRouter = Router();


foodRouter.get("/:id", foodController.getFoodInfo)

module.exports = foodRouter;