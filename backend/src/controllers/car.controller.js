const db = require("../config/db");

/**
 * GET /api/cars
 * → retourne un tableau (OBLIGATOIRE pour le frontend)
 */
exports.getAll = (req, res) => {
  db.query("SELECT * FROM cars", (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
};

/**
 * POST /api/cars
 * → retourne l’objet créé
 */
exports.create = (req, res) => {
  const car = req.body;

  db.query("INSERT INTO cars SET ?", car, (err, result) => {
    if (err) return res.status(500).send(err.message);

    res.json({
      id: result.insertId,
      ...car,
    });
  });
};

/**
 * PUT /api/cars/:id
 * → retourne l’objet modifié
 */
exports.update = (req, res) => {
  const { id } = req.params;
  const car = req.body;

  db.query(
    "UPDATE cars SET ? WHERE id = ?",
    [car, id],
    (err) => {
      if (err) return res.status(500).send(err.message);

      res.json({
        id: Number(id),
        ...car,
      });
    }
  );
};

/**
 * DELETE /api/cars/:id
 */
exports.remove = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM cars WHERE id = ?", id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.json({ success: true });
  });
};
