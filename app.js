const express = require("express");
const { connectToMongoDB } = require("./config/db");
const { connectToRedis } = require("./config/redis");
const helmet = require("helmet");
const cors = require("cors");
const { logger } = require("./middlewares/logger");
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

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} enviroment on port: ${PORT}`
  );
});
