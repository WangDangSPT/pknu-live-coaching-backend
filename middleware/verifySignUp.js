const User = require('../models/user')

const checkDuplicateUsernameEmail = async (req,res,next) =>{
    await User.findOne({
        username: req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({error: err})
            return
        }
        if(user){
            res.status(400).send({error: 'Username already exists'})
            return
        }
    })
    await User.findOne({
        email: req.body.email
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({error: err})
            return
        }
        if(user){
            res.status(400).send({error: 'email already in use'})
            return
        }

         next()
    })
}

module.exports = {
    checkDuplicateUsernameEmail
}