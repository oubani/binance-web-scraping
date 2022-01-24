const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please add a name'],
		minlength: [3, 'FirstName can not be less then 3 characters'],
		maxlength: [30, 'FirstName can not be more then 3 characters'],
	},
	lastName: {
		type: String,
		required: [true, 'Please add a name'],
		minlength: [3, 'LastName can not be less then 3 characters'],
		maxlength: [30, 'lastName can not be more then 3 characters'],
	},
	email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
		required: [true, 'Please enter Email'],
		unique: [true, 'Email Already taken'],
	},
	password: {
		type: String,
		required: [true, 'Please add password'],
		minlength: [8, 'Password can not be less then 6 characters'],
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Encrupt Password using bcrypt

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// encrupt password before store
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWt_EXPIRE,
	});
};

// compare password with hashed one to login

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
