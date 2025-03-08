const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
    host: "localhost",
    user: process.env.USERNAME,
    database: "inventory_app",
    password: process.env.USER_PSW,
    port: 5432
});