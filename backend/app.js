const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoute");
const user=require("./routes/userRoute")
app.use("/api/v1", productRoutes);
app.use("/api/v1",user)
// Error Handling Middleware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
