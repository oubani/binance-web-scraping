const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
	// _id: Object,
	name: {
		type: String,
		required: [true, 'Name is Required'],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
