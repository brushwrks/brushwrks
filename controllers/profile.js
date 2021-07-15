const Profile = require("../models/user");
const User = require("../models/user");

module.exports = (app) => {
    // get profile
    app.get("/profile/edit", (req, res) => {
        console.log(req.user.username, "going to edit");
        res.render("profileEdit");
    });

    app.get("/profile/:username", (req, res) => {
        console.log(req.user.username, "in viewing");
        console.log(req.user._id);
        const user = req.user;
        //     console.log(user);
        User.findById(req.user._id)
            .lean()
            .then((user) => res.render("profile", { user }))
            .catch((err) => {
                console.log(err);
            });
    });
    // edit profile
    app.post("/:username/profile/edit", (req, res) => {
        // const user = req.user._id;
        console.log(req.user.username);
        console.log("next");

        if (req.user) {
            User.findOneAndUpdate(
                { username: req.user.username },
                {
                    avatar: req.body.avatar,
                }
            )
                .lean()
                .then((result) => {
                    console.log(
                        "success, ",
                        req.body.avatar,
                        "added to ",
                        req.user.username
                    );
                })
                .catch((error) => console.error(error));
        }
        console.log(req.body.avatar);
        console.log(req.user.username);
        res.redirect("/profile/amman");
    });
    // .then((data) => {
    //     if (!data) {
    //         console.log("Cannot update");
    //     }
    // })
    // .catch((err) => {
    //     console.log(err.message);
    // });

    // console.log(req.user._id, "user id");
    // console.log(req.user.username, "username");
    // console.log(req.user.avatar, "avatar");
    // let userId = req.user._id;
    // const userId = req.user._id;
    // const profile = req.body;
    // const found = User.findById({ _id: userId });
    // console.log(profile);
};
