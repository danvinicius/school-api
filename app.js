require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./src/routes/user.route");
const studentRouter = require("./src/routes/student.route");
const tokenRouter = require("./src/routes/token.route");

//connection to mongodb
require("./src/database/connection");

//express config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/login", tokenRouter);

module.exports = app;
