const User = require('../models/User');

// @desc Register a user
// @route Post auth/Register
// @access Public
exports.register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		// create new user
		const user = await User.create({ firstName, lastName, email, password });
		console.log('user created');
		console.log(user);

		const token = user.getSignedJwtToken();

		res.status(200).json({ sucess: true, token });
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ sucess: false, message: error.message });
	}
};
exports.login = async (req, res) => {
	const { email, password } = req.body;

	// Validate email and password

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'Please enter a valide email and password' });
	}

	// check for user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return res.status(401).json({ message: 'Invalid credencials' });
	}

	// check if password matches

	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return res.status(401).json({ message: 'Invalid credencials' });
	}

	const token = user.getSignedJwtToken();

	res.json({ sucess: true, token });
};
