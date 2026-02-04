const mysql = require("mysql2");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const db = mysql.createConnection(config);

function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.error("❌ MySQL not ready, retrying in 3s...", err.code);
      setTimeout(connectWithRetry, 3000);
      return;
    }
    console.log("MySQL connected");
  });
}

connectWithRetry();

module.exports = db;
