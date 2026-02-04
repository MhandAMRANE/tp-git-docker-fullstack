const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;
const carRoutes = require("./routes/car.routes");
app.use("/cars", carRoutes);
const clientRoutes = require("./routes/client.routes");
app.use("/api/clients", clientRoutes);
const rentalRoutes = require("./routes/rental.routes");
app.use("/api/rentals", rentalRoutes);
