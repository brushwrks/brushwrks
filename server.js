// Require Libraries
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;

// App Setup
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use(express.static(__dirname + "/public"));
app.use(cookieParser()); // Add this after you initialize express.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(checkAuth);
// app.use(express.static("public"));

require("./data/brushwrks-db");

module.exports = app;
