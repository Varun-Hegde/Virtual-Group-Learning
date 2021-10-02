const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const options = {
	auth: {
		api_key: process.env.SEND_GRID_API,
	},
};
const transporter = nodemailer.createTransport(sendGridTransport(options));

const sendEmail = async (options) => {
	// 1) Create a transporter(A service that sends email, (like gmail))
	// 2) Define email options
	// 3) Actually send the email

	// 1)
	/* const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},

		//Activate in gmail "Less secure app" option
	}); */

	// 2)
	/* const mailOptions = {
		from: 'Varun Hegde <varunhegde2k@gmail.com>',
		to: options.email,
		subject: options.subject,
		text: options.message,
		// html:
	}; */
	console.log(options.user);
	const mailOptions = {
		to: options.user.email,
		from: 'varunhegde2k@gmail.com',
		subject: 'Virtual-Group-Learning password reset request',
		html: `<p>Hey ${options.user.name
			.split(' ')[0]
			.toString()}, There was a request for password reset. <a href=${
			options.resetURL
		}>Click this link to reset the password </a>   </p>
      <p>This token is valid for only 1 hour.</p>`,
	};

	// 3)
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
