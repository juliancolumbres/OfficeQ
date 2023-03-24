const Session = require('../models/session.js');

const newSession = (req, res) => {
    const professorId = req.body.professorId;
    const professorName = req.body.professorName;
    const university = req.body.university;
    const title = req.body.title;
    const className = req.body.class;
    const school = req.body.school;
    const description = req.body.description;
    const location = req.body.location;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const inSession = req.body.inSession;
    const groups = [];
    const currentGroupIndex = 0;


    const newSession = new Session({
        professorId: professorId,
        professorName: professorName,
        university: university,
        title: title,
        class: className,
        school: school,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        inSession: inSession,
        groups: groups,
        currentGroupIndex: currentGroupIndex
    });

    newSession.save().then((session) => {
        res.send({ _id: session._id })
    }).catch((err) => {
        console.log(err)
    })
}

const search = (req, res) => {
    const professorName = req.query.professorName;
    const className = req.query.className;

    console.log(professorName);
    console.log(className);

    const query = {
        $or: [
            { class: className },
            { professorName: professorName }
        ]
    };


    Session.find(query).then((sessions) => {
        res.send(sessions);
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })

}


const addQuestionToTopic = (req, res) => {
    const { id } = req.params;
    const { studentId, question, name, topic } = req.body;

    Session.findById(id)
        .then((session) => {
            const groupIndex = session.groups.findIndex((group) => group.topic === topic);

            if (groupIndex !== -1) {
                session.groups[groupIndex].studentQuestions.push({ studentId: studentId, question: question, name: name });
            } else {
                session.groups.push({ topic, studentQuestions: [{ studentId: studentId, question: question, name: name }] });
            }

            return session.save();
        })
        .then((updatedSession) => {
            res.json(updatedSession);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Could not add student question to group.' });
        });

}

<<<<<<< HEAD
module.exports = { newSession, addQuestionToTopic, search };
=======

module.exports = { newSession, addQuestionToTopic };
>>>>>>> Made small changes to add question route
