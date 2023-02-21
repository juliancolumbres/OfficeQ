const express = require('express');
const router  = express.Router(); 
const sessionController = require('../controllers/session'); 

router.post('/createSession', sessionController.newSession);

module.exports = router; 