const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function getAllCategoriesAndFood(req, res) {
    const categories = await db.getAllCategories();
    const food = await db.getAllFood();
    res.render("index", { categories: categories, food: food})
}


async function getCategoryFood(req, res) {
    const categoryId = req.params.categoryId;
    const categories = await db.getAllCategories();
    const title = await db.getCategoryTitle(categoryId);
    const food = await db.getCategoryFood(categoryId);

    res.render("category.ejs", {
        title: title,
        food: food,
        categories: categories
    } )
}

async function renderAddCategoryForm(req, res) {
    res.render("addCategoryForm", {
        title: "Add category"
    })
}
const alphaErr = "must only contain letters";
const validateCategoryForm = [
    body("categoryName")
        .trim()
        .matches(/^[a-zA-Z ]*$/).withMessage(`Category name ${alphaErr}`)
        .isLength({ min: 1, max: 20 }).withMessage(`The category name length must be between 1 and 20 characters`)
]

async function insertCategory(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).render("addCategoryForm", {
            title: "Add category",
            errors: errors.array()
    })
    }
    const categoryName = req.body.categoryName;
    await db.insertCategory(categoryName)
    res.redirect("/");
}

async function renderEditCategoryForm(req, res) {
    const categoryId = req.params.id;
    const category = await db.getCategory(categoryId);
    res.render("editCategoryForm", {
        title: "Edit category",
        category: category
    })
}

async function saveEditedCategory(req, res) {
    const errors = validationResult(req);
    const categoryId = req.params.id;
    const category = await db.getCategory(categoryId);
    const newName = req.body.categoryName;

    if (!errors.isEmpty()) {
        return res.status(404).render("editCategoryForm", {
        title: "Edit category",
        category: category,
        errors: errors.array()
    })
    }

    await db.updateCategory(newName, categoryId);
    res.redirect("/");
    
}

module.exports = {
    getAllCategoriesAndFood,
    getCategoryFood,
    renderAddCategoryForm,
    insertCategory,
    renderEditCategoryForm,
    saveEditedCategory,
    validateCategoryForm
}