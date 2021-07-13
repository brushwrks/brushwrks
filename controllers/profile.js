const Profile = require("../models/user");
const User = require("../models/user");

module.exports = (app) => {
    // create profile
    app.post("/edit/profile"),
        (req, res) => {
            if (req.user) {
                const userId = req.user._id;
                var profile = new Profile(req.body);
                profile.avatar = avatarURL;
            }
        };
};
