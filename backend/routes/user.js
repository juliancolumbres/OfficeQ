const express = require('express');
const router  = express.Router(); 
const userController = require('../controllers/user'); 

router.post('/signup', userController.newUser);
router.post('/login', userController.findUser); 

module.exports = router; 