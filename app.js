const express = require("express");
const { connectToMongoDB } = require("./config/db");
const { connectToRedis } = require("./config/redis");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const { logger } = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
require("dotenv").config(); // Load enviroment variables

// Init app
const app = express();

// Connect to MongoDB
connectToMongoDB();

// Connect to Redis
connectToRedis();

// Static Folder
app.use(express.static(path.join(__dirname, "images")));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.use("/api/authors", require("./routes/authors"));
app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/orders", require("./routes/orders"));
app.use("/password", require("./routes/password"));
app.use("/api/upload", require("./routes/upload"));

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
