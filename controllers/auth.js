const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

let bcrypt = require('bcryptjs')

const signup = async(req,res)=>{
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,8)
        })
        const output = await user.save()
        res.status(200).json(output)
    } catch (error) {
        console.error(error)
        res.status(500).send({error: err})
    }
}

const login = async (req,res)=>{
    try {
        //match username in database
        await User.findOne({
            username: req.body.username
        }).exec((err,user)=>{
            if(err){
                return res.status(500).send({error: err})
            }
            if(!user){
                return res.status(404).send({error: 'user not found'})
            }
            let validPassword = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if(!validPassword) {
                return res.status(401).send({error: 'invalid password'})
            }
            // once verified give token to client
            const token = jwt.sign({
                username: user.username,
                _id: user._id
             },'secret123',{expiresIn: 86400})

            res.status(200).json({token: token})
        })
    } catch (error) {
        res.status(500).json({error: 'internal server error, unable to login'})
    }
}

module.exports = {
    login,
    signup
}
