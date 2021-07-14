const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, select: false },
    email: { type: String, required: true },
    avatar: { type: String, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isArtist: { type: Boolean, default: False },

    artistInfo: {
        status: { type: String },
        art: { type: String },
        tags: { type: String },
        tools: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        patreon: { type: String },
        commission: [{ commission_type: String, price: String }],
        revisions: { type: String },
        turnaround: { type: String },
        terms: { type: String },
    },
});

module.exports = model("User", userSchema);

// Must use function expressions here! ES6 => functions do not bind this!
userSchema.pre("save", function (next) {
    // ENCRYPT PASSWORD
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (_, hash) => {
            user.password = hash;
            next();
        });
    });
});

// Need to use function to enable this.password to work.
userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = model("User", userSchema);
