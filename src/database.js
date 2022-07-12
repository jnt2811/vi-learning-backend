const mysql = require("mysql");

const db = mysql.createPool({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b81c0258d427de",
  password: "c3158b03",
  database: "heroku_69d1673d5f21964",
  multipleStatements: true,
});

module.exports = db;
