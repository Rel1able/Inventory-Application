const db = require("../db/queries");

async function renderFoodInfo(req, res) {
    const foodId = req.params.id;
    let foodData = await db.getFoodInfo(foodId);
    res.render("singleProduct", {
        productName: foodData.food_name,
        productDescription: foodData.food_description
    })
}

async function renderAddFoodForm(req, res) {
    const categories = await db.getAllCategories();
    res.render("addFoodForm", {
        title: "Add food",
        categories: categories
       }) 
}

async function insertFood(req, res) {
    const foodName = req.body.foodName;
    const categoryId = req.body.category;
    const foodDescription = req.body.foodDesc;

    await db.insertFood(foodName, categoryId, 1, foodDescription);
    res.redirect("/");

}

async function renderEditProductForm(req, res) {
    const categories = await db.getAllCategories();
    console.log(categories);
    const id = req.params.id;
    const product = await db.getFoodInfo(id);
    console.log("Product", product);
     res.render("editProductForm", {
        title: "Edit Product", 
         product: product,
        categories: categories
     })
}

async function saveEditedProduct(req, res) {
    const id = req.params.id;
    const name = req.body.productName;
    const desc = req.body.productDesc;
    const categoryId = req.body.category;
    console.log("Categoryid", categoryId)
    await db.updateProduct(id, name, desc, categoryId);
    res.redirect("/");
}

module.exports = {
    renderFoodInfo,
    renderAddFoodForm,
    insertFood,
    renderEditProductForm,
    saveEditedProduct
}