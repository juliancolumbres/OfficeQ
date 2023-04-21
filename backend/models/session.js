const mongoose = require("mongoose");

const StudentQuestions = mongoose.Schema(
    {
        studentId: { type: String },
        question: { type: String },
        name: { type: String },
        privateMeeting: { type: Boolean }
    }
)

const Groups = mongoose.Schema(
    {
        topic: String,
        studentQuestions: [StudentQuestions]
    }
)

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
    groups: [Groups],
    currentGroupIndex: { type: Number }
})

module.exports = Session;