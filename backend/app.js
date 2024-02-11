const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoute");
app.use("/api/v1", productRoutes);

// Error Handling Middleware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
