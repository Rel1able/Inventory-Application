const db = require("../db/queries");

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    console.log(categories);
    res.render("index", {title: "Categories", categories: categories})
}

async function getCategoryFood(req, res) {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    const title = await db.getCategoryTitle(categoryId);
    const food = await db.getCategoryFood(categoryId);
    console.log(food);
    res.render("category.ejs", {
        title: title,
        food: food
    } )
}

module.exports = {
    getAllCategories,
    getCategoryFood
}