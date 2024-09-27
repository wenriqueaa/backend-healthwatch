const express = require('express')
// permitir comunicarnos con el frontend
const router = express.Router()
const {getCollectionStats} = require('../controllers/collectionsController');

router.get('/statservicehealt', getCollectionStats);

module.exports = router;
