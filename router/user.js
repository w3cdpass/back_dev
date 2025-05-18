const express = require('express');
const {handleusersinup, handleuserLogin} = require('../controllers/user')
const router = express.Router()

router.post('/',handleusersinup)
router.post('/login',handleuserLogin)

module.exports = router
