const User = require('../models/user.js');

const newUser = (req, res) => {
    email = req.body.email,
    password = req.body.password

    let newUser = new User({
        email: email,
        password: password
    })
    newUser.save().then((user) => {
        res.send(user)
    }).catch((err) => {
        console.log(error)
    })
};

const findUser = (req, res) => {
    email = req.body.email;
    password = req.body.password;

    const user = User.findOne({email: email}).then((user) => {
        if (user == null || password !== user.password) {
            res.send({message: "invalid email/password"});
        }
        else {
            res.send({message: "logged in"});
        }
    }).catch((err) => {
        console.log(err)
    })
};


module.exports = {newUser, findUser};