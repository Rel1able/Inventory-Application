const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategoriesAndFood)

categoriesRouter.get("/createCategory", categoriesController.renderAddCategoryForm)
categoriesRouter.post("/createCategory",categoriesController.validateCategoryForm, categoriesController.insertCategory)

categoriesRouter.get("/:id/editCategory", categoriesController.renderEditCategoryForm);
categoriesRouter.post("/:id/editCategory",categoriesController.validateCategoryForm, categoriesController.saveEditedCategory);

categoriesRouter.get("/:categoryId", categoriesController.getCategoryFood);
categoriesRouter.post("/:categoryId", categoriesController.deleteCategory);



module.exports = categoriesRouter;