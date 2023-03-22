const Session = require ('../models/session.js');

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
        res.send({_id: session._id})
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {newSession};
