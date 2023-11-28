require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  database: process.env.MYSQL_ADDON_DB,
  password: process.env.MYSQL_ADDON_PASSWORD,
  waitForConnections: true,
  connectionLimit: 1000000,
  queueLimit: 100000,
});

const sqlUsers = "SELECT * FROM NewTable";
const sqlDeals = "SELECT * FROM dealsInfo";

pool.query(sqlUsers, function (err, usersResult) {
  if (err) {
    throw err;
  }
});

pool.query(sqlDeals, function (err, dealsResult) {
  if (err) {
    throw err;
  }
});

module.exports = pool;
