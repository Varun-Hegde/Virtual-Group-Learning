const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//Check if entered password is correct(during join rooms)
roomSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword,
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
