const Profile = require("../models/user");
const User = require("../models/user");

module.exports = (app) => {
    // get a user profile
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

    // navigate to profile update form
    app.get("/profile/edit", (req, res) => {
        console.log(req.user.username, "going to edit");
        res.render("profileEdit");
    });

    // edit user profile
    app.post("/profile/edit", (req, res) => {
        // const user = req.user._id;
        console.log(req.user.username);
        console.log("next");

        if (req.user) {
            User.findOneAndUpdate(
                { username: req.user.username },
                {
                    avatar: req.body.avatar,
                    status: req.body.status,
                    art: req.body.art,
                    tags: req.body.tags,
                    tools: req.body.tools,
                    twitter: req.body.twitter,
                    instagram: req.body.instagram,
                    patreon: req.body.patreon,
                    commision: req.body.commision,
                    revisions: req.body.revisions,
                    turnaround: req.body.turnaround,
                    terms: req.body.terms,
                }
            )
                .lean()
                .then((result) => {
                    console.log(
                        "success, "
                        // req.body.avatar,
                        // "added to ",
                        // req.user.username
                    );
                })
                .catch((error) => console.error(error));
        }
        // console.log(req.body.avatar);
        // console.log(req.user.username);
        res.redirect(`/profile/${user.username}`);
    });
};
