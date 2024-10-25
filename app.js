const express = require("express");
const { connectToMongoDB } = require("./config/db");
const { connectToRedis } = require("./config/redis");
const helmet = require("helmet");
const cors = require("cors");
const { logger } = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
require("dotenv").config(); // Load enviroment variables

// Init app
const app = express();

// Connect to MongoDB
connectToMongoDB();

// Connect to Redis
connectToRedis();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Set View Engine
app.set("view engine", "ejs");

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors());

// Routes
app.use("/api/authors", require("./routes/authors"));
app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/orders", require("./routes/orders"));
app.use("/password", require("./routes/password"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} enviroment on port: ${PORT}`
  );
});
