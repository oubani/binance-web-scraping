const mongoose = require('mongoose');

const MONGOURI = `mongodb+srv://oubani123:oubani123@oubani.ej0s4.mongodb.net/cryptoCoin?retryWrites=true&w=majority`;

const connectDb = async () => {
	const conn = await mongoose.connect(MONGOURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log(`MongoDb Connected ${conn.connection.host}`);
};

module.exports = connectDb;
