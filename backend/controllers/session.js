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
        res.send({ _id: session._id });
        res.status(200);
    }).catch((err) => {
        console.log(err)
    })
}

const getSession = (req, res) => {
    const { session_id } = req.params;
    Session.findOne({ _id: session_id }).then((session) => {
        res.send(session);
        res.status(200);
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
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

const addQuestionToTopic = async (req, res) => {
    const { id } = req.params;
    const { studentId, question, name, privateMeeting, topic } = req.body;

    console.log(`Session ID:`, id);
    Session.findById(id)
        .then((session) => {

            const groupIndex = session.groups.findIndex((group) => group.topic === topic);

            if (groupIndex !== -1) {
                const studentQuestionsIndex = session.groups[groupIndex].studentQuestions;
                studentQuestionsIndex.push({ studentId: studentId, question: question, name: name, privateMeeting: privateMeeting });
            } else {
                session.groups.push({ topic, studentQuestions: [{ studentId: studentId, question: question, name: name, privateMeeting: privateMeeting }] });
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

const getSessionUpdates = async (req, res) => {
    const { session_id } = req.params;

    res.set({
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
    });
    res.flushHeaders();

    const changeStream = Session.watch({ _id: session_id });
    changeStream.on('change', () => {
        Session.findOne({ _id: session_id })
            .then((session) => {

                console.log(session);
                res.write(`data: ${JSON.stringify(session)}\n\n`);
            })
            .catch((err) => {
                console.error(err);
            });
    });


    req.on('close', () => {
        changeStream.close();
        res.end();
    });
};

const getAllTopics = (req, res) => {
    const { id } = req.params;

    Session.findById(id)
        .then((sessions) => {
            const allTopics = sessions.groups.map(session => session.topic);
            res.send(allTopics);
        })
        .catch((err) => {
            res.status(500);
            res.send({ error: "internal server error" });
            console.log(err);
        });
};

module.exports = { newSession, getSession, addQuestionToTopic, search, getSessionUpdates, getAllTopics };