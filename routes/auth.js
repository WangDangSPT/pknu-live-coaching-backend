const express = require('express')
const router = express.router()
const {login,signup} = require('../controllers/auth')
const {checkDuplicateUsernameEmail} = require('../middleware/verifySignUp')

router.post('/signup',checkDuplicateUsernameEmail,signup)
router.post('/login',login)

module.exports = router
