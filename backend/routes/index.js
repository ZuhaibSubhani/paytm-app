// backend/routes/index.js
const express = require("express");
const userRouter = require("./user"); // User routes
const  accountRouter  = require("./account"); // Account routes

const Router = express.Router(); // Create the main router

// Add user and account routes to the main router
Router.use("/user", userRouter);
Router.use("/account", accountRouter);

// Export the main router
module.exports = Router;
