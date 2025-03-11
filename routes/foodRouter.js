const { Router } = require("express");
const foodController = require("../controllers/foodController");
const foodRouter = Router();

foodRouter.get("/addFood", foodController.renderAddFoodForm)
foodRouter.post("/addFood", foodController.insertFood);

foodRouter.get("/:id", foodController.renderFoodInfo)



module.exports = foodRouter;