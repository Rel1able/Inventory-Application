const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategoriesAndFood)

categoriesRouter.get("/:categoryId", categoriesController.getCategoryFood);

module.exports = categoriesRouter;