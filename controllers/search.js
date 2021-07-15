const Profile = require("../models/user");
const User = require("../models/user");

module.exports = (app) => {
    // edit profile
    app.get("/search", (req, res) => {
        const query = req.query;
        console.log(query);
        // User.findOneAndUpdate();
        // const userId = req.user._id;
        // var profile = new Profile(req.body);
        // profile.avatar = avatarURL;
        res.render("/");
    });
};
