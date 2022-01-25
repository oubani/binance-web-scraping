const express = require('express');
const { getSinglepost, getAllposts } = require('../controllers/pages');

const router = express.Router();

router.get('/', getAllposts);
router.post('/', getSinglepost);

module.exports = router;
