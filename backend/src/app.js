const express = require("express");
const cors = require("cors");

const carRoutes = require("./routes/car.routes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => {
  res.send("Car Rental API running");
});

module.exports = app;
