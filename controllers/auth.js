const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const login = async (req,res)=>{
    try {
        //match username in database
        const user = await User.find({
            username: req.body.user_id
        })
        //use middleware to check authentication token
        const token = jwt.sign({
            username: user.username
        },'secret123')
        res.status(200).json({status: 'ok', user: token})
    } catch (error) {
        res.status(404).json({status: 'error', user: false})
    }
}

module.exports = {
    login
}
