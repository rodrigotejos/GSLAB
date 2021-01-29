const { Pool } = require("pg");

const client = new Pool({
  user: "postgres",
  database: "postgres",
  password: "postgres",
  host: "localhost",
});

module.exports = client;
