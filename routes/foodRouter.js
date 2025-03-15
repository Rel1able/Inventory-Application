const { Router } = require("express");
const foodController = require("../controllers/foodController");
const foodRouter = Router();

foodRouter.get("/addFood", foodController.renderAddFoodForm)
foodRouter.post("/addFood",foodController.validateFoodForm, foodController.insertFood);

foodRouter.get("/:id/editProduct",foodController.renderEditProductForm)
foodRouter.post("/:id/editProduct",foodController.validateFoodForm, foodController.saveEditedProduct);

foodRouter.get("/:id", foodController.renderFoodInfo)



module.exports = foodRouter;