const mongoose = require("mongoose");

const Session = mongoose.model(
    "Session", {
        sessionName: { type: String },
        hasStarted: { type: Boolean },
        hasEnded: { type: Boolean },
        school: { type: String },
        professorName: { type: String },
        className: { type: String },
        description: { type: String },
        startTime: { type: Date },
        endTime: { type: Date }
})

module.exports = Session;