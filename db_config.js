const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "12345",
  database: "postgres",
});

module.exports = client;
