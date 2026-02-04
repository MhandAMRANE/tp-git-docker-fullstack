const mysql = require("mysql2");

<<<<<<< HEAD
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL connected");
});
=======
const config = {
  host: process.env.DB_HOST || "mysql-db",
  user: process.env.DB_USER || "caruser",
  password: process.env.DB_PASSWORD || "carpass",
  database: process.env.DB_NAME || "car_rental",
};

const db = mysql.createConnection(config);

function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.error("DB connection failed:", err.code, err.message);
      console.log("Retrying in 3 seconds...");
      setTimeout(connectWithRetry, 3000);
      return;
    }
    console.log("Connected to MySQL!");
  });
}

connectWithRetry();
>>>>>>> frontend

module.exports = db;
