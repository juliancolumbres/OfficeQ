const mongoose = require("mongoose");

const Session = mongoose.model(
    "Session", {
        professorId: { type: String },
        title: { type: String },
        class: { type: String },
        school: { type: String },
        description: { type: String },
        location: { type: String },
        startTime: { type: Date },
        endTime: { type: Date },
        inSession: { type: Boolean },
})

module.exports = Session;