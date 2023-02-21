const User = require('../models/user.js');

const newUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userRole = req.body.userRole;

    const newUser = new User({
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

    User.findOne({email: email, userRole: userRole }).then((user) => {
        if (user == null || password !== user.password) {
            res.status(401);
            res.send({error: "invalid email/password"});
        }
        else {
            res.send({user_id: user._id});
        }
    }).catch((err) => {
        res.status(500);
        res.send({ error: "internal server error" });
        console.log(err)
    })
};

module.exports = {newUser, findUser};