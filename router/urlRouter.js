const express = require('express');
const {GenrateNewShort, handleGetAnalytics} = require('../controllers/usrlcont')

const router = express.Router();
router.get('/analytics/:shortId',handleGetAnalytics )
// post create
router.post('/', GenrateNewShort)
module.exports = router