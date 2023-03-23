const express = require('express');
const router  = express.Router(); 
const sessionController = require('../controllers/session'); 

router.post('/createSession', sessionController.newSession);
router.get('/sessions', sessionController.search);

module.exports = router; 