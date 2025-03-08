const { Client } = require("pg");

const { argv } = require("node:process");

console.log(argv);

const SQL = `
DROP TABLE categories;
DROP TABLE food;
DROP TABLE suppliers;

CREATE TABLE IF NOT EXISTS categories (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 category_name VARCHAR(255));

INSERT INTO categories (category_name)
 VALUES
    ('dairy'),
    ('muka'),
    ('fruits');

CREATE TABLE IF NOT EXISTS food (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    food_name VARCHAR(255),
    category_id INTEGER,
    supplier_id INTEGER
);

INSERT INTO food (food_name, category_id, supplier_id)
    VALUES
        ('milk',1, 2),
        ('apple',3, 3),
        ('banana', 3, 4);

CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_name VARCHAR(255));

INSERT INTO suppliers (supplier_name)
    VALUES
        ('Vevela'),
        ('Lovea'),
        ('Serilia');

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


