const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>{
    let token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({error: 'no token provided, unauthorized access'})
    }
    jwt.verify(token,'secret123',(err,decoded)=> {
        if(err){
            return res.status(401).send({error: 'unauthorized access'})
        }
        req.username = decoded.username
        req._id = decoded._id
    })
    next()
}

module.exports = {
    verifyToken
}