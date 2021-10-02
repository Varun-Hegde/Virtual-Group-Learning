const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const Room = require('../models/roomModel');

const createRoom = catchAsync(async (req, res, next) => {
	let { name, password } = req.body;

	if (!name || !password)
		return next(new AppError('Password and Room name required', 400));

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	password = hashedPassword;

	const studentsInRoom = [];
	studentsInRoom.push(req.user._id);

	roomCode = await nanoid();

	const queryObj = {
		name,
		password,
		admin: req.user._id,
		studentsInRoom,
		roomCode,
	};

	const room = await Room.create(queryObj);

	res.json({
		status: 'success',
		data: {
			room,
		},
	});
});

module.exports = {
	createRoom,
};
