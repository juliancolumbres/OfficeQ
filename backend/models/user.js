const mongoose = require("mongoose");

const User = mongoose.model(
    "User", {
        email: { type: String },
        password: { type: String }
})

module.exports = User;