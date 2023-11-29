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

const sqlComments = "SELECT * FROM comments";

pool.query(sqlComments, function (err, usersResult) {
  if (err) {
    throw err;
  }
});

module.exports = pool;
