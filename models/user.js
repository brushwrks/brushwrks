const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
// const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: { type: String },
    art: [{ type: String }],
    tags: { type: String },
    tools: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    patreon: { type: String },
    // commission: [{ commission_type: String, price: String }],
    commission: { type: String },
    revisions: { type: String },
    turnaround: { type: String },
    terms: { type: String },
});
// add datetime for artists "became an artist at"

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
