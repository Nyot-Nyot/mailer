const signup = (req, res) => {
	res.status(200).json({ message: "User signed up successfully" });
};

const getBill = (req, res) => {
	res.status(200).json({ message: "Bill generated successfully" });
};

module.exports = { signup, getBill };
