const db = require("../db/queries");

async function getAllCategoriesAndFood(req, res) {
    const categories = await db.getAllCategories();
    const food = await db.getAllFood();
    console.log(categories);
    console.log(food);
    res.render("index", { categories: categories, food: food})
}


async function getCategoryFood(req, res) {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    const categories = await db.getAllCategories();
    const title = await db.getCategoryTitle(categoryId);
    const food = await db.getCategoryFood(categoryId);
    console.log(food);
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
    console.log("opened form");
}

async function insertCategory(req, res) {
    const categoryName = req.body.categoryName;
    console.log(req.body.categoryName);
    await db.insertCategory(categoryName)
    res.redirect("/");
}

async function renderEditCategoryForm(req, res) {
    const categoryId = req.params.id;
    console.log(categoryId);
    const category = await db.getCategory(categoryId);
    res.render("editCategoryForm", {
        title: "Edit category",
        category: category
    })
}

async function saveEditedCategory(req, res) {
    const categoryId = req.params.id;
    console.log("CAtegoryid", categoryId);
    const newName = req.body.categoryName;
    console.log("New name", newName);
    await db.updateCategory(newName, categoryId);
    console.log("updated");
    res.redirect("/");
    
}

module.exports = {
    getAllCategoriesAndFood,
    getCategoryFood,
    renderAddCategoryForm,
    insertCategory,
    renderEditCategoryForm,
    saveEditedCategory
}