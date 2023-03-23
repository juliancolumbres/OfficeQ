const mongoose = require("mongoose");

const User = mongoose.model(
    "User", {
        university: { type: String },
        name: {type: String},
        email: { type: String },
        password: { type: String },
        userRole: { type: String }
})

module.exports = User;