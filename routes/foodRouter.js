const { Router } = require("express");
const foodController = require("../controllers/foodController");
const foodRouter = Router();


foodRouter.get("/:id", foodController.renderFoodInfo)

module.exports = foodRouter;