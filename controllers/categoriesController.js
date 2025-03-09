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

module.exports = {
    getAllCategoriesAndFood,
    getCategoryFood
}