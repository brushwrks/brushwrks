const Profile = require("../models/user");
const User = require("../models/user");

module.exports = (app) => {
    // edit profile
    app.post("/edit/:username"),
        (req, res) => {
            Profile.findOneAndUpdate(
            )
                const userId = req.user._id;
                var profile = new Profile(req.body);
                profile.avatar = avatarURL;
            }
        };
};
