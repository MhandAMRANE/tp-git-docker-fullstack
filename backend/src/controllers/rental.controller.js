const db = require("../config/db");

// GET → tableau
exports.getAll = (req, res) => {
  const sql = `
    SELECT rentals.*, 
           clients.nom, clients.prenom,
           cars.marque, cars.modele
    FROM rentals
    JOIN clients ON rentals.client_id = clients.id
    JOIN cars ON rentals.car_id = cars.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// POST → objet créé + calcul prix
exports.create = (req, res) => {
  const { client_id, car_id, date_debut, date_fin } = req.body;

  const days =
    (new Date(date_fin) - new Date(date_debut)) / (1000 * 60 * 60 * 24);

  db.query(
    "SELECT prix_par_jour FROM cars WHERE id = ?",
    car_id,
    (err, result) => {
      if (err) return res.status(500).json(err);

      const prix_total = days * result[0].prix_par_jour;

      const rental = {
        client_id,
        car_id,
        date_debut,
        date_fin,
        prix_total
      };

      db.query(
        "INSERT INTO rentals SET ?",
        rental,
        (err, insertResult) => {
          if (err) return res.status(500).json(err);

          res.json({
            id: insertResult.insertId,
            ...rental
          });
        }
      );
    }
  );
};

// PUT → objet modifié
exports.update = (req, res) => {
  const { id } = req.params;
  const rental = req.body;

  db.query(
    "UPDATE rentals SET ? WHERE id = ?",
    [rental, id],
    err => {
      if (err) return res.status(500).json(err);

      res.json({
        id: Number(id),
        ...rental
      });
    }
  );
};

// DELETE
exports.remove = (req, res) => {
  db.query(
    "DELETE FROM rentals WHERE id = ?",
    req.params.id,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Rental deleted" });
    }
  );
};
