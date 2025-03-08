const { Client } = require("pg");

const { argv } = require("node:process");

console.log(argv);

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 category_name VARCHAR(255));

INSERT INTO categories (category_name)
 VALUES
    ('dairy'),
    ('muka'),
    ('fruits');
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