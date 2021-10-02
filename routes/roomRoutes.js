const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const RoomController = require('../controllers/roomController');

router.post('/create', authMiddleware.protect, RoomController.createRoom); //Create room
router.post('/join', authMiddleware.protect, RoomController.joinRoom); //Join room
router.get('/:id/subjects', authMiddleware.protect, RoomController.getSubjects);

module.exports = router;
