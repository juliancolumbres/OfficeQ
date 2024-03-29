const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session');

router.post('/createSession', sessionController.newSession);
router.get('/sessions', sessionController.search);
router.put('/:id/addQuestionToTopic', sessionController.addQuestionToTopic);
router.get('/:session_id/updates', sessionController.getSessionUpdates);
router.get('/:id/getAllTopics', sessionController.getAllTopics);
router.get('/:session_id/details', sessionController.getSession);
router.patch('/:session_id/merge', sessionController.mergeGroups);
router.delete('/:id', sessionController.deleteMeeting);
router.patch('/:id/start', sessionController.startMeeting);
router.patch('/:id/nextTopic', sessionController.nextTopic);

module.exports = router; 