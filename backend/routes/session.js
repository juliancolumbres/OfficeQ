const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session');

router.post('/createSession', sessionController.newSession);
router.get('/sessions', sessionController.search);
router.put('/:id/addQuestionToTopic', sessionController.addQuestionToTopic);
router.get('/:session_id/updates', sessionController.getSessionUpdates);

module.exports = router; 