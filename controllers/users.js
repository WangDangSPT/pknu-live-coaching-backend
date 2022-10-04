const res = require('express/lib/response')
const {getsubmission,submitcode,lsdir,readsrc} = require('../helpers/users')
const axios = require('axios')
const SourceCode = require('../models/sourcecode')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const login = async (req,res)=>{
    try {
        const user = await User.find({
            username: req.body.user_id
        })
        const token = jwt.sign({
            username: user.username
        },'secret123')
        res.status(200).json({status: 'ok', user: token})
    } catch (error) {
        res.status(404).json({status: 'error', user: false})
    }
}
const compile = async (req,res)=>{
    try{
        const username = req.query.user_id
        const documentid = req.query.project_id
        // pull sourcecode from mongo
        sourcecode = SourceCode.find({$and: [{_id: documentid},{user: username}]})
        // submit sourcecode to judge0
        const optionSubmit = {
            method: 'POST',
            url: 'https://18.182.33.113:2358/submissions',
            params: {base64_encoded: 'true',wait: 'false', fields: '*'},
            headers: {
              'content-type': 'application/json',
              'Content-Type': 'application/json',
              'Capstone-Auth-Token': process.env.JUDGEKEY
            },
            data: sourcecode
          };
        let token = await axios(optionSubmit)
        // submit token and recieve output
        const optionGet = {
            method: 'GET',
            url: `https://18.182.33.113:2358/submissions/${token.token}`,
            params: {base64_encoded: 'true',wait: 'false', fields: '*'},
            headers: {
              'content-type': 'application/json',
              'Content-Type': 'application/json',
              'Capstone-Auth-Token': process.env.JUDGEKEY
            },
            data: sourcecode
          };
        let output = await axios(optionGet)
        res.status(200).json(output)
    }catch(error){
        console.error(error)
        res.status(404).send(error)

    }

}
const readsrcfile = async(req,res)=>{
    try {
        const id = req.query.id
        //user path in linux server
        const path = `../userdata/${id}`
        let output = await readsrc(path)
        res.status(200).json({id: id, data: output})
    } catch (error) {
        console.error(error)
        res.status(404).send(error)   
    }
}

const register = async(req,res)=>{
    try {
        const user = new User({
            username: req.body.user_id
        })
        const output = await user.save()
        res.status(200).json(output)
    } catch (error) {
        console.error(error)
        res.status(404).send({error: 'preexisting username'})
    }
}

const getprojects = async(req,res)=>{
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token,'secret123')
        const username = decoded.username
        const sourcecodelist = await SourceCode.find({user_owner: username})
        res.status(200).json(sourcecodelist)
    } catch (error) {
        console.error(error)
        res.status(404).send({error: 'project not found'})
    }
}
const newproject = async(req,res)=>{
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token,'secret123')
        const username = decode.username
        const newprojectfile = await SourceCode.save({
                title: req.body.title,
                language_id: req.body.language_id,
                user_owner: username
        })
        
    } catch (error) {
        
    }
}

module.exports = {
    login,
    compile,
    readsrcfile,
    register,
    getprojects,
    newproject
}
