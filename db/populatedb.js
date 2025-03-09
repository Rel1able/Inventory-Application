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
    supplier_id INTEGER
);

INSERT INTO food (food_name, category_id, supplier_id)
    VALUES
        ('apple', 1, 1),
        ('banana', 1, 1),
        ('orange', 1, 1),
        ('peach', 1, 1),
        ('pear', 1, 1),
        ('grapes', 1, 1),
        ('watermelon', 1, 1),
        ('potatoes', 2, 2),
        ('carrots', 2, 2),
        ('mushrooms', 2, 2),
        ('broccoli', 2, 2),
        ('tomatoes', 2, 2),
        ('corn', 2, 2),
        ('avocado', 2, 2),
        ('bread', 3, 3),
        ('rice', 3, 3),
        ('popcorn', 3, 3),
        ('oatmeal', 3, 3),
        ('pasta', 3, 3),
        ('pretzels', 3, 3),
        ('muffins', 3, 3),
        ('eggs', 4, 4),
        ('beef', 4, 4),
        ('chicken', 4, 4),
        ('nuts', 4, 4),
        ('pork', 4, 4),
        ('salmon', 4, 4),
        ('tuna', 4, 4),
        ('milk', 5, 5),
        ('yogurt', 5, 5),
        ('kefir', 5, 5),
        ('cheese', 5, 5),
        ('soymilk', 5, 5),
        ('butter', 5, 5),
        ('ice cream', 5, 5);

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


