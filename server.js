const express = require('express');

const dotenv = require('dotenv');
const connectDb = require('./database/db');

// Load vars
dotenv.config({
	path: './config/config.env',
});

// connect to Db
connectDb();

// import Routes
const auth = require('./routes/auth');
const favorites = require('./routes/favorite');
const posts = require('./routes/pages');
// middleware
const { protect } = require('./middleware/auth');

// initial app with expres
const app = express();

app.use(express.json());

// Routes
app.use('/auth', auth);
app.use('/favorites', protect, favorites);
app.use('/', posts);

const server = app.listen(3000, () => {
	console.log(`server running in 3000  https://localhost:3000 `);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error : ${err.message}`);
	server.close(() => process.exit(1));
});
