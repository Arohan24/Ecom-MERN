const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
// Error Handling Middleware
const errorMiddleware = require("./middleware/error");

// Middleware
app.use(express.json());
app.use(cookieParser());
// Routes 
const productRoutes = require("./routes/productRoute");
const userRoutes=require("./routes/userRoute")
app.use("/api/v1", productRoutes);
app.use("/api/v1",userRoutes)


app.use(errorMiddleware);

module.exports = app;
