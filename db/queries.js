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
    const {rows} = await pool.query('SELECT food_name FROM food WHERE category_id = ($1)', [categoryId])
    return rows;
}

async function getCategoryTitle(categoryId) {
    const { rows} = await pool.query('SELECT category_name FROM categories WHERE id = ($1)', [categoryId]);
    console.log(rows[0].category_name);
    return rows[0].category_name;
}

async function insertCategory(categoryName) {
    await pool.query("INSERT INTO categories (category_name) VALUES($1)", [categoryName]);
    console.log("inserted");
}




module.exports = {
    getAllCategories,
    getCategoryFood,
    getCategoryTitle,
    getAllFood,
    insertCategory
}
