const { Client } = require("pg");

const { argv } = require("node:process");

console.log(argv);

const SQL = `


CREATE TABLE IF NOT EXISTS categories (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 category_name VARCHAR(255) UNIQUE);

INSERT INTO categories (category_name)
 VALUES
    ('Fruits'),
    ('Vegetables'),
    ('Grains'),
    ('Protein Food'),
    ('Dairy');

CREATE TABLE IF NOT EXISTS food (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    food_name VARCHAR(255) UNIQUE,
    category_id INTEGER,
    supplier_id INTEGER,
    food_description VARCHAR(255)
);

INSERT INTO food (food_name, category_id, supplier_id, food_description)
    VALUES
        ('apple', 1, 1, 'A sweet and crunchy fruit, often red or green'),
        ('banana', 1, 1, 'A soft, yellow fruit rich in potassium'),
        ('orange', 1, 1, 'A juicy citrus fruit high in vitamin C'),
        ('peach', 1, 1, 'A soft, fuzzy fruit with a sweet taste'),
        ('pear', 1, 1, 'A juicy fruit with a slightly grainy texture'),
        ('grapes', 1, 1, 'Small, juicy fruits that grow in clusters'),
        ('watermelon', 1, 1, 'A large, refreshing fruit with a high water content'),
        ('potatoes', 2, 2, 'A starchy root vegetable, versatile in cooking'),
        ('carrots', 2, 2, 'A crunchy orange vegetable, rich in beta-carotene'),
        ('mushrooms', 2, 2, 'Edible fungi with an earthy flavor'),
        ('broccoli', 2, 2, 'A green vegetable high in fiber and vitamins'),
        ('tomatoes', 2, 2, 'A juicy red fruit often used in cooking'),
        ('corn', 2, 2, 'A yellow vegetable that grows on cobs'),
        ('avocado', 2, 2, 'A creamy green fruit rich in healthy fats'),
        ('bread', 3, 3, 'A staple food made from flour and water'),
        ('rice', 3, 3, 'A versatile grain, a staple in many cuisines'),
        ('popcorn', 3, 3, 'A puffed corn snack, popular at movies'),
        ('oatmeal', 3, 3, 'A warm cereal made from oats'),
        ('pasta', 3, 3, 'An Italian staple made from wheat flour'),
        ('pretzels', 3, 3, 'A baked snack with a distinctive twisted shape'),
        ('muffins', 3, 3, 'A small, baked cake-like treat'),
        ('eggs', 4, 4, 'A protein-rich food from chickens'),
        ('beef', 4, 4, 'Meat from cattle, rich in protein and iron'),
        ('chicken', 4, 4, 'A popular poultry meat, lean and versatile'),
        ('nuts', 4, 4, 'Crunchy, protein-packed seeds with healthy fats'),
        ('pork', 4, 4, 'Meat from pigs, used in various cuisines'),
        ('salmon', 4, 4, 'A fatty fish rich in omega-3s'),
        ('tuna', 4, 4, 'A lean fish often used in salads and sushi'),
        ('milk', 5, 5, 'A dairy drink rich in calcium'),
        ('yogurt', 5, 5, 'A fermented dairy product with probiotics'),
        ('kefir', 5, 5, 'A tangy, probiotic-rich dairy drink'),
        ('cheese', 5, 5, 'A dairy product made from curdled milk'),
        ('soymilk', 5, 5, 'A plant-based milk alternative made from soybeans'),
        ('butter', 5, 5, 'A dairy spread made from churned cream'),
        ('ice cream', 5, 5, 'A frozen dessert made from dairy and sugar');


CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_name VARCHAR(255));

INSERT INTO suppliers (supplier_name)
    VALUES
        ('Dole Food Company'),
        ('Fresh Del Monte'),
        ('Cargil'),
        ('Tyson Foods'),
        ('Lactalis');

`;


async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: argv[2],
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
main();


