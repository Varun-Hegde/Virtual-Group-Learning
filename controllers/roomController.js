const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const Room = require('../models/roomModel');
const User = require('../models/userModel');

const createRoom = catchAsync(async (req, res, next) => {
	let { name, password, description } = req.body;

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
		description,
	};

	const room = await Room.create(queryObj);

	const user = await User.findById(req.user._id);
	user.roomsPartOf.push(room._id);

	await user.save();

	res.json({
		status: 'success',
		data: {
			room,
		},
	});
});

const joinRoom = catchAsync(async (req, res, next) => {
	let { roomCode, password } = req.body;

	if (!roomCode || !password) {
		return next(new AppError('Password and Room name required', 400));
	}

	const room = await Room.findOne({ roomCode });

	if (room && (await room.correctPassword(password, room.password))) {
		const user = await User.findById(req.user._id);

		console.log(req.user._id);
		if (user.roomsPartOf.includes(room._id))
			return next(new AppError('You are already a part of this room'));

		user.roomsPartOf.push(room._id);
		await user.save();

		room.studentsInRoom.push(req.user._id);
		await room.save();
		room.password = undefined;
		res.json({
			success: true,
			data: {
				room,
			},
		});
	} else {
		return next(new AppError('Room or password is incorrect', 400));
	}
});

//Get all subjects of a room
const getSubjects = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	let subjects = await Room.findById(id, 'subjects').populate({
		path: 'subjects',
		select: 'name createdBy',
	});
	subjects = await subjects.populate({
		path: 'subjects.createdBy',
		select: 'name',
	});
	res.json({
		status: 'success',
		data: subjects,
	});
});

module.exports = {
	createRoom,
	joinRoom,
	getSubjects,
};
