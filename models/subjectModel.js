const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const subjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Subject name needed'],
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		resources: [
			{
				type: String,
				createdBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
