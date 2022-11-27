const express = require('express')
const router = express.Router()
const {login,signup} = require('../controllers/auth')
const {checkDuplicateUsernameEmail} = require('../middleware/verifySignUp')

router.post('/signup',checkDuplicateUsernameEmail,signup)
router.post('/login',login)

module.exports = router
