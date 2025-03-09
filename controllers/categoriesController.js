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

async function addCategory(req, res) {
    res.render("addCategoryForm", {
        title: "Add category"
    })
    console.log("opened form");
}

async function logCategory(req, res) {
    console.log("added");
    res.redirect("/");

}

module.exports = {
    getAllCategoriesAndFood,
    getCategoryFood,
    addCategory,
    logCategory
}