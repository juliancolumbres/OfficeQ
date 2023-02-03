const User = require('../models/user.js');

const newUser = (req, res) => {
    email = req.body.email,
    password = req.body.password

    let newUser = new User({
        email: email,
        password: password
    })

    User.findOne({email: email}).then((user) => {
        if (user != null) {
            res.status(409);
            res.send({error: "email already in use"});
        }
        else {
            newUser.save().then((user) => {
                res.send({user_id: user._id})
            }).catch((err) => {
                console.log(err)
            })
        }
    }).catch((err) => {
        console.log(err)
    })
    console.log("executed");
};

const findUser = (req, res) => {
    email = req.body.email;
    password = req.body.password;

    User.findOne({email: email}).then((user) => {
        if (user == null || password !== user.password) {
            res.status(401);
            res.send({error: "invalid email/password"});
        }
        else {
            res.send({user_id: user._id});
        }
    }).catch((err) => {
        console.log(err)
    })
};


module.exports = {newUser, findUser};