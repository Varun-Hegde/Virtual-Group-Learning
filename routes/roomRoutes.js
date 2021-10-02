const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const RoomController = require('../controllers/roomController');

router.post('/', authMiddleware.protect, RoomController.createRoom); //Create room

module.exports = router;
