const mysql = require("mysql2");

let database_info = {
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b81c0258d427de",
  password: "c3158b03",
  database: "heroku_69d1673d5f21964",
  multipleStatements: true,
  supportBigNumbers: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(database_info);
const conn = pool.promise();

module.exports = conn;
