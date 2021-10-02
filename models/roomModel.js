const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
	{
		roomCode: {
			type: String,
			required: [true, 'No Room Code'],
			unique: true,
		},
		name: {
			type: String,
			required: [true, 'Please give a valid room name'],
		},
		password: {
			type: String,
			minLength: 5,
			required: [true, 'Please give a valid password'],
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		studentsInRoom: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
	},
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
