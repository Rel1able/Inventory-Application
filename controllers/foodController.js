const db = require("../db/queries");
const { body, validationResult } = require("express-validator");



async function renderFoodInfo(req, res) {
    const foodId = req.params.id;
    let foodData = await db.getFoodInfo(foodId);
    const categoryId = foodData.category_id;
    const category = await db.getCategory(categoryId)
    const categories = await db.getAllCategories();

    res.render("singleProduct", {
        productName: foodData.food_name,
        productDescription: foodData.food_description,
        productId: foodId,
        category: category,
        product: foodData,
        categories: categories
    })
}

const alphaErr = "can only contain letters";
const validateFoodForm = [
    body("foodName")
        .trim()
        .matches(/^[a-zA-Z .,]*$/).withMessage(`Food name ${alphaErr}`)
        .isLength({min: 1, max: 20}).withMessage("Food name must be between 1 and 20 characters"),
    body("foodDesc")
        .trim()
        .matches(/^[a-zA-Z .,]*$/).withMessage(`Food Description ${alphaErr}`)
        .isLength({ min: 1, max: 50 }).withMessage("Description must be between 1 and 50 characters long"),
    body("category")
        .not()
        .equals("Please select the category you would like to add the product to")
        .withMessage("Please select the category you would like to add the product to")
]

async function renderAddFoodForm(req, res) {
    const categories = await db.getAllCategories();
    res.render("addFoodForm", {
        title: "Add food",
        categories: categories
       }) 
}

async function insertFood(req, res) {
    const categories = await db.getAllCategories();
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).render("addFoodForm", {
            title: "Add food",
            categories: categories,
            errors: errors.array(),
        })
    }

    const foodName = req.body.foodName;
    const categoryId = req.body.category;
    const foodDescription = req.body.foodDesc;

    await db.insertFood(foodName, categoryId, foodDescription);
    res.redirect("/");

}

async function renderEditProductForm(req, res) {
    const categories = await db.getAllCategories();
    const id = req.params.id;
    const product = await db.getFoodInfo(id);
     res.render("editProductForm", {
        title: "Edit Product", 
         product: product,
        categories: categories
     })
}

async function saveEditedProduct(req, res) {
    const id = req.params.id;
    const name = req.body.foodName;
    const desc = req.body.foodDesc;
    const categoryId = req.body.category;
    const categories = await db.getAllCategories();
    const product = await db.getFoodInfo(id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("editProductForm", {
        title: "Edit Product", 
        product: product,
        categories: categories,
        errors: errors.array(),
     })
    }

    await db.updateProduct(id, name, desc, categoryId);
    res.redirect(`/food/${id}`);
}


async function deleteProduct(req, res) {    
    const productId = req.params.id;
    await db.deleteProduct(productId);
    res.redirect("/");
}


module.exports = {
    renderFoodInfo,
    renderAddFoodForm,
    insertFood,
    renderEditProductForm,
    saveEditedProduct,
    validateFoodForm,
    deleteProduct
}