const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");

// send mail with testing account
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

// send mail with real account
const getBill = (req, res) => {
	// log incoming request briefly to help debugging (will appear on server console)
	console.log("getBill headers:", req.headers);
	console.log("getBill body:", req.body);

	// accept userEmail from multiple possible sources to be more tolerant of client
	const userEmail = (req.body && req.body.userEmail) || req.query.userEmail || req.headers["x-user-email"];

	if (!userEmail) {
		return res.status(400).json({ error: "Missing required field: userEmail" });
	}

	let config = {
		service: "gmail",
		auth: {
			user: EMAIL,
			pass: PASSWORD,
		},
	};

	let transporter = nodemailer.createTransport(config);

	let mailGenerator = new mailgen({
		theme: "default",
		product: {
			name: "Mailgen",
			link: "https://mailgen.js/",
		},
	});

	let response = {
		body: {
			name: "Davalil",
			intro: "Your bill has been generated!",
			table: {
				data: [
					{
						item: "Nodemailer Stack Book",
						description: "A complete guide to Nodemailer",
						price: "$10.99",
					},
					{
						item: "Mailgen Course",
						description: "Learn how to generate emails easily",
						price: "$19.99",
					},
				],
				columns: {
					// Optionally, customize the column widths
					customWidth: {
						item: "20%",
						price: "15%",
					},
					// Optionally, change column text alignment
					customAlignment: {
						price: "right",
					},
				},
			},
			outro: "Thank you for using our service!",
		},
	};

	let mail = mailGenerator.generate(response);

	let message = {
		from: EMAIL,
		to: userEmail,
		subject: "Your Bill",
		html: mail,
	};

	transporter
		.sendMail(message)
		.then(() => {
			return res.status(200).json({ message: "Bill email sent successfully" });
		})
		.catch(error => {
			return res.status(500).json({ error: "Error sending bill email", details: error });
		});

	// res.status(200).json({ message: "Bill generated successfully" });
};

module.exports = { signup, getBill };
