const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session');

router.post('/createSession', sessionController.newSession);

router.put('/:id/addQuestionToTopic', sessionController.addQuestionToTopic);

module.exports = router; 