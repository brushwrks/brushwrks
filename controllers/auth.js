const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    // SIGN UP FORM
    app.get("/signup", (req, res) => {
        res.render("signup");
    });

    // app.get("/purge", (req, res) => {
    //     User.deleteMany()
    //         .then(function () {
    //             console.log("Everything deleted");
    //             res.redirect("/signup");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // });

    // SIGN UP POST
    app.post("/signup", (req, res) => {
        // Create User and JWT
        const user = new User(req.body);

        user.save()
            .then((user) => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
                    expiresIn: "60 days",
                });
                res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
                res.redirect("/login");
            })
            .catch((err) => {
                console.log(err.message);
                return res.status(400).send({ err: err });
            });
    });

    // Login form
    app.get("/login", (req, res) => res.render("login"));

    // LOGIN
    app.post("/login", (req, res) => {
        const { username, password } = req.body;
        // Find this user name
        User.findOne({ username }, "username password")
            .then((user) => {
                if (!user) {
                    // User not found
                    return res
                        .status(401)
                        .send({ message: "Wrong Username or Password" });
                }
                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // Password does not match
                        return res
                            .status(401)
                            .send({ message: "Wrong Username or password" });
                    }
                    // Create a token
                    const token = jwt.sign(
                        { _id: user._id, username: user.username },
                        process.env.SECRET,
                        {
                            expiresIn: "60 days",
                        }
                    );
                    // Set a cookie and redirect to root
                    res.cookie("nToken", token, {
                        maxAge: 900000,
                        httpOnly: true,
                    });
                    console.log(user.username, "authenticated successfully");
                    res.redirect("/");
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
    // Logout
    app.get("/logout", (req, res) => {
        res.clearCookie("nToken");
        res.redirect("/");
    });
};
