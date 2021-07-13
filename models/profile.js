const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
    avatar: { type: String, default: "" },
    status: { type: String, default: "Closed" },
    art: { type: String, default: "" },
    tags: { type: String },
    tools: { type: String },
    socials: {
        twitter: String,
        instagram: String,
        patreon: String,
    },
    commission: [{ commission_type: String, price: String }],
    commission_info: [
        {
            revisions: String,
            turnaround: String,
            terms: String,
        },
    ],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("Profile", profileSchema);
