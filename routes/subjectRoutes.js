const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const SubjectController = require('../controllers/subjectController');

router.post('/', authMiddleware.protect, SubjectController.createSubject); //Create Subject

module.exports = router;
