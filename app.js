import express from "express";
import { config } from "dotenv";

// Load enviroment variables
config()

// Init app
const app = express();

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} enviroment on port: ${PORT}`
  );
});
