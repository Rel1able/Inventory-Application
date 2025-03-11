const db = require("../db/queries");

async function renderFoodInfo(req, res) {

    const foodId = req.params.id;
    console.log(foodId);
    let foodData = await db.getFoodInfo(foodId);
    console.log(foodData);
    res.render("singleProduct", {
        productName: foodData.food_name,
        productDescription: foodData.food_description
    })
}

async function renderAddFoodForm(req, res) {

    const categories = await db.getAllCategories();
    console.log("Categories: ", categories);
    

    res.render("addFoodForm", {
        title: "Add food",
        categories: categories
       }) 
}

async function insertFood(req, res) {
    const foodName = req.body.foodName;
    const categoryId = req.body.category;
    console.log(foodName);
    console.log(categoryId);

    await db.insertFood(foodName, categoryId, 1, "Some cool pumpkin");
    res.redirect("/");

}

module.exports = {
    renderFoodInfo,
    renderAddFoodForm,
    insertFood
}