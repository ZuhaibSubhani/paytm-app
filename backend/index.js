const express = require("express");
const Router = require("./routes/index"); // Import your routes
const cors = require("cors");

const mongoose = require("mongoose");

const app = express(); // Initialize the Express app

app.use(express.json()); // Middleware for parsing JSON
app.use(cors()); // Middleware for handling CORS

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/docker")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Set up routes
app.use("/api/v1", Router);

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
