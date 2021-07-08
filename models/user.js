const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, select: false },
        follows: [{ type: Schema.Types.ObjectId, ref: "Follows" }],
        art: [{ type: Schema.Types.ObjectID, ref: "Art" }],
    },
    { timestamps: true }
);

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
