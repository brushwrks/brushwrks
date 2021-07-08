const { Schema, model } = require("mongoose");

const artSchema = new Schema(
    {
        name: { type: String, required: true },
        artist: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tags: { type: String, required: false },
        favorited_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

module.exports = model("Art", artSchema);
