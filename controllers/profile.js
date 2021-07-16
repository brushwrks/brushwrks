const Profile = require("../models/user");
const User = require("../models/user");

module.exports = (app) => {
    // get a user profile
    app.get("/:username", (req, res) => {
        // console.log(req.user.username, "in viewing");
        // console.log(req.user._id);
        // console.log(req.params.username);
        console.log(req.params.username);
        //     console.log(user);
        User.findOne({ username: req.params.username })
            .lean()
            .then((user) => res.render("profile", { user }))
            .catch((err) => {
                console.log(err);
            });
    });
    app.get("/", (req, res) => {
        User.find({})
            .lean()
            .then((users) => res.render("home", { users }))
            .catch((err) => {
                console.log(err.message);
                console.log(users);
            });
    });
    // navigate to profile update form
    app.get("/profile/edit", (req, res) => {
        if (req.user) {
            console.log(req.user.username, "going to edit");
        }
        res.render("profileEdit");
    });

    // edit user profile
    app.post("/profile/edit", (req, res) => {
        console.log(req.body, "boop");
        console.log("next");
        console.log(req);
        if (req.user) {
            User.findOneAndUpdate(
                { username: req.user.username },
                {
                    $set: {
                        avatar: req.body.avatar,
                        bio: req.body.bio,
                        status: req.body.status,
                        art: req.body.art,
                        tags: req.body.tags,
                        tools: req.body.tools,
                        twitter: req.body.twitter,
                        instagram: req.body.instagram,
                        patreon: req.body.patreon,
                        commission: req.body.commission,
                        revisions: req.body.revisions,
                        turnaround: req.body.turnaround,
                        terms: req.body.terms,
                    },
                },
                { new: true, omitUndefined: true, strict: false }
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
        // // console.log(req.body.avatar);
        // // console.log(req.user.username);
        res.redirect(`/${req.user.username}`);
    });
};
