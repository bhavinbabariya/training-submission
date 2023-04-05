const express = require("express");
const app = express();

const errorHandler = require("./errorHandler");

// Middleware
app.use(express.json());

// Define Routes

app.use("/user", require("./routes/userRoutes"));
app.use("/product", require("./routes/productRoutes"));
app.use("/order", require("./routes/orderRoutes"));
app.use("/query", require("./routes/queryRoutes"));

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
