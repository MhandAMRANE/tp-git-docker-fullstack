const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM cars", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  db.query("INSERT INTO cars SET ?", req.body, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Car added" });
  });
};

exports.update = (req, res) => {
  db.query(
    "UPDATE cars SET ? WHERE id = ?",
    [req.body, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Car updated" });
    }
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM cars WHERE id = ?",
    req.params.id,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Car deleted" });
    }
  );
};
