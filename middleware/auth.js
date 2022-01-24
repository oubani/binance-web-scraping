const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
	console.log('-------------called-------------');
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}
		// Make sure token exists
		if (!token) {
			return res.status(400).json({ message: 'Not authorized' });
		}
		// verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded);
		req.user = await User.findById(decoded.id);

		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
