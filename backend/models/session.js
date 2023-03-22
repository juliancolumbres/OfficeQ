const mongoose = require("mongoose");

const Session = mongoose.model(
    "Session", {
        professorId: { type: String },
        professorName: { type: String },
        university: { type: String },
        title: { type: String },
        class: { type: String },
        school: { type: String },
        description: { type: String },
        location: { type: String },
        startTime: { type: String },
        endTime: { type: String },
        inSession: { type: Boolean },
        groups: { type: Array },
        currentGroupIndex: { type: Number }
})

module.exports = Session;