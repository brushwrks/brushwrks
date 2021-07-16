// Require Libraries
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const checkAuth = require("./middleware/checkAuth");

// Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
    "645610436832-j6gfn065fkkse2g9h8rhcip57vol8jne.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const port = 3000;

// App Setup
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
app.use(cookieParser()); // Add this after you initialize express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkAuth);

require("./data/brushwrks-db");
require("./controllers/auth")(app);
require("./controllers/profile")(app);
require("./controllers/search")(app);

// Routes
// app.get("/", (req, res) => {
//     res.render("home");
// });

// app.get("/profile", (req, res) => {
//     res.render("profile");
// });

// app.get("/profileEdit", (req, res) => {
//     res.render("profileEdit");
// });

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    let token = req.body.token;

    console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload["sub"];
        console.log(payload);
    }
    verify()
        .then(() => {
            res.cookie("session-token", token);
            res.send("success");
        })
        .catch(console.error);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
