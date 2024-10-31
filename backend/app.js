const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/userroutes");

const app = express();

// Apply Middleware
app
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(express.json())
  .use(helmet({ crossOriginResourcePolicy: false }))
  .use(morgan("combined"));

// API Routes
app.use("/api", userRoutes);

module.exports = app;
