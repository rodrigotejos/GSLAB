const { Pool } = require("pg");

const client = new Pool({
  user: "postgres",
  database: "postgres",
  password: "postgres",
  host: "172.25.0.101",
  //host:"localhost",
});

module.exports = client;
