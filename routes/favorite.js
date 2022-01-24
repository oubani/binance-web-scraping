const express = require('express');
const {
	addToFavorite,
	getAllFavorite,
	removeFromFavorite,
} = require('../controllers/favorite');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('', getAllFavorite);
router.post('', addToFavorite);
router.delete('/:id', removeFromFavorite);

module.exports = router;
