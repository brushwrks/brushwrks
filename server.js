// Require Libraries
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const checkAuth = require("./middleware/checkAuth");
const port = 3000;

// App Setup
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(cookieParser()); // Add this after you initialize express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkAuth);

require("./data/brushwrks-db");
require("./controllers/auth")(app);
require("./controllers/profile")(app);

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.get("/profileEdit", (req, res) => {
  res.render("profileEdit");
});


app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
