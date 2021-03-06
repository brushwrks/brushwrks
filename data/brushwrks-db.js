/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

// const url = "mongodb://db.amman.dev:27017/brushwrks";
const url = "mongodb://db.brushwrks.com:27017/brushwrks";
mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (err) => {
        assert.equal(null, err);
        console.log("Connected successfully to database");

        // db.close(); turn on for testing
    }
);
mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection Error:")
);
mongoose.set("debug", true);

module.exports = mongoose.connection;
