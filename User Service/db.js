const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "user",
});
const asyncPool = {};

asyncPool.query = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, function (error, results, fields) {
      if (error) reject(error);
      resolve(JSON.stringify(results));
    });
  });
};

module.exports = {
  pool,
  asyncPool,
};
