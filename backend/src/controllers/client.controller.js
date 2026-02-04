const db = require("../config/db");

// GET /api/clients → tableau
exports.getAll = (req, res) => {
  db.query("SELECT * FROM clients", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results); // ⚠️ tableau
  });
};

// POST /api/clients → objet créé
exports.create = (req, res) => {
  const client = req.body;

  db.query("INSERT INTO clients SET ?", client, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      id: result.insertId,
      ...client
    });
  });
};

// PUT /api/clients/:id → objet modifié
exports.update = (req, res) => {
  const { id } = req.params;
  const client = req.body;

  db.query(
    "UPDATE clients SET ? WHERE id = ?",
    [client, id],
    err => {
      if (err) return res.status(500).json(err);

      res.json({
        id: Number(id),
        ...client
      });
    }
  );
};

// DELETE
exports.remove = (req, res) => {
  db.query(
    "DELETE FROM clients WHERE id = ?",
    req.params.id,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Client deleted" });
    }
  );
};
