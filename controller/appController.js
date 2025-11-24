const nodemailer = require("nodemailer");

const signup = async (req, res) => {
	try {
		// create ethereal test account (for development/testing)
		let testAccount = await nodemailer.createTestAccount();

		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
			},
		});

		let message = {
			from: '"Fred Foo 👻" <foo@example.com>',
			to: "bar@example.com, baz@example.com",
			subject: "Hello ✔",
			text: "Hello world?",
			html: "<b>Hello world?</b>",
		};

		// use async/await so we can access `info` returned by sendMail
		const info = await transporter.sendMail(message);

		return res.status(200).json({
			message: "User signed up successfully, email sent",
			previewURL: nodemailer.getTestMessageUrl(info),
		});
	} catch (err) {
		return res.status(500).json({ error: "Error sending email", details: err });
	}
};

const getBill = (req, res) => {
	res.status(200).json({ message: "Bill generated successfully" });
};

module.exports = { signup, getBill };
