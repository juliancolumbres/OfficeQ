const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.newUser);
router.post('/login', userController.findUser);

router.get('/:userId/name', userController.getName);
router.get('/:userId/university', userController.getUniversity);
router.get('/:userId/sessions', userController.getSessions);
router.get('/:userId/sessions/enrolled', userController.getSessionsEnrolled);

module.exports = router; 