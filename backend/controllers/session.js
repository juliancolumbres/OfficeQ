const Session = require ('../models/session.js');

const newSession = (req, res) => {
    const sessionName = req.body.sessionName;
    const hasStarted = req.body.hasStarted; 
    const hasEnded = req.body.hasEnded;
    const school = req.body.school;
    const professorName = req.body.professorName;
    const className = req.body.className;
    const description = req.body.description;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const newSession = new Session({
        sessionName: sessionName,
        hasStarted: hasStarted,
        hasEnded: hasEnded,
        school: school,
        professorName: professorName,
        className: className,
        description: description,
        startTime: startTime,
        endTime: endTime
    });

    newSession.save().then((session) => {
        res.send({_id: session._id})
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {newSession};
