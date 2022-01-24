const mongoose = require('mongoose');
const Favorite = require('../models/Favorite');

exports.getAllFavorite = async (req, res) => {
	try {
		return res
			.status(200)
			.json({ message: 'get all favorite', user: req.user });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.addToFavorite = async (req, res) => {
	// console.log(req.payload.data);
	try {
		const favorite = await Favorite.create({
			name: 'idasasas',
			user: req.user,
		});
		return res.status(200).json({ message: 'add favorite', favorite });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.removeFromFavorite = async (req, res) => {
	console.log(mongoose.Types.ObjectId.isValid(req.params.id));

	try {
		const favorite = await Favorite.findByIdAndDelete({ _id: req.params.id });

		return res.status(200).json({ message: 'Favorite deleted' });
	} catch (error) {
		return res.status(400).json({ message: 'favorite not found' });
	}
};
