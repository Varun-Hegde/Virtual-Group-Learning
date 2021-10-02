const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Room = require('../models/roomModel');
const User = require('../models/userModel');
const Subject = require('../models/subjectModel');

//Create new subject
const createSubject = catchAsync(async (req, res, next) => {
	const { name, roomId } = req.body;

	const room = await Room.findById(roomId);

	if (!room) next(new AppError('Invalid Room', 400));

	let subject = new Subject();
	subject.name = name;
	subject.createdBy = req.user._id;
	subject = await subject.save();

	room.subjects.push(subject._id);
	await room.save();

	res.status(201).json({
		status: 'success',
		data: subject,
	});
});

module.exports = { createSubject };
