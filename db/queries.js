const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getAllFood() {
    const { rows } = await pool.query("SELECT * FROM food");
    return rows;
}

async function getCategoryFood(categoryId) {
    const {rows} = await pool.query('SELECT id, food_name FROM food WHERE category_id = ($1)', [categoryId])
    return rows;
}

async function getCategoryTitle(categoryId) {
    const { rows} = await pool.query('SELECT category_name FROM categories WHERE id = ($1)', [categoryId]);
    console.log(rows[0].category_name);
    return rows[0].category_name;
}

async function getCategory(categoryId) {
    const {rows} = await pool.query('SELECT * FROM categories WHERE id = ($1)', [categoryId]);
    return rows[0];
}

async function insertCategory(categoryName) {
    await pool.query("INSERT INTO categories (category_name) VALUES($1)", [categoryName]);
    console.log("inserted");
}

async function getFoodInfo(foodId) {
    const { rows } = await pool.query("SELECT * FROM food WHERE id = ($1)", [foodId])
    return rows[0];
}


async function insertFood(name, categoryId,supplierId, description ) {
    await pool.query("INSERT INTO food (food_name, category_id, supplier_id, food_description) VALUES($1, $2, $3, $4)", [name, categoryId, supplierId, description]);

}

async function updateCategory(newName, categoryId) {
    await pool.query("UPDATE categories SET category_name = ($1) WHERE id = ($2)", [newName, categoryId])
}

async function updateProduct(productId, newName, newDescription, newCategoryId) {
    await pool.query("UPDATE food SET food_name = ($1), food_description = ($2), category_id = ($3) WHERE id = ($4)", [newName, newDescription, newCategoryId, productId]);
}

async function deleteCategory(categoryId) {
    await pool.query("DELETE FROM categories WHERE id = ($1)", [categoryId])
}


async function deleteProduct(productId) {
    await pool.query("DELETE FROM food WHERE id = ($1)", [productId]);
}

module.exports = {
    getAllCategories,
    getCategoryFood,
    getCategoryTitle,
    getAllFood,
    insertCategory,
    getFoodInfo,
    insertFood,
    updateCategory,
    getCategory,
    updateProduct,
    deleteCategory,
    deleteProduct
}
