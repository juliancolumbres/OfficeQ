const User = require('../models/user.js');
const Session = require('../models/session.js');

const newUser = (req, res) => {
    const university = req.body.university;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userRole = req.body.userRole;

    const newUser = new User({
        university: university,
        name: name,
        email: email,
        password: password,
        userRole: userRole
    })

    User.findOne({ email: email, userRole: userRole }).then((user) => {
        if (user != null) {
            res.status(409);
            res.send({ error: "email already in use" });
        }
        else {
            newUser.save().then((user) => {
                res.send({ user_id: user._id });
                res.status(200);
            }).catch((err) => {
                res.status(500);
                res.send({ error: "internal server error" });
                console.log(err);
            })
        }
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })
};

const findUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userRole = req.body.userRole;

    User.findOne({ email: email, userRole: userRole }).then((user) => {
        if (user == null || password !== user.password) {
            res.status(401);
            res.send({ error: "invalid email/password" });
        }
        else {
            res.send({ user_id: user._id });
            res.status(200);
        }
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })
};

const getName = (req, res) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId }).then((user) => {
        res.send({ name: user.name });
        res.status(200);
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })
};

const getUniversity = (req, res) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId }).then((user) => {
        res.send({ university: user.university });
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })
};

const getSessions = (req, res) => {
    const userId = req.params.userId;
    Session.find({ professorId: userId }).then((sessions) => {
        res.send(sessions);
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })
};


const getSessionsEnrolled = (req, res) => {
    const userId = req.params.userId;

    const query = {
        groups: {
            $elemMatch: {
                studentQuestions: {
                    $elemMatch: { studentId: userId }
                }
            }
        }
    };

    Session.find(query).then((sessions) => {
        res.send(sessions);
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })
};





module.exports = { newUser, findUser, getName, getUniversity, getSessions, getSessionsEnrolled };