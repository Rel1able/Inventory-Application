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

module.exports = {
    renderFoodInfo
}