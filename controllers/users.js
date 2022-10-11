const res = require('express/lib/response')
const {getsubmission,submitcode,lsdir,readsrc} = require('../helpers/users')
const axios = require('axios')
const {SourceCode} = require('../models/sourcecode')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const compile = async (req,res)=>{
    try{
        const username = req.username
        const documentid = req.query.projects
        // pull sourcecode from mongo
        sourcecode = SourceCode.find({$and: [{_id: documentid},{user_owner: username}]})
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

const getprojects = async(req,res)=>{
    
    // gets the array of projects owned by this user
    await User.find({username: req.username,_id: req._id}, {projects:1, _id: 0}).exec((err,projects)=>{
        if(err){
            console.error(err)
            res.status(500).send({error: 'cant find this users projects'})
            return
        }
        if(projects){
            return res.status(200).json(projects)
        }
    })
    
}
const newproject = async(req,res)=>{
    try{
    const user = await User.find({_id: req._id, username: req.username})
    const newproject = new SourceCode({
        title: req.body.title,
        language_id: req.body.language_id
    })
    await user.projects.push(newproject)
    const output = await user.save()
    res.status(200).send(output)
    }catch(error){
        console.error(error)
        res.status(500).send({error: error})
    }
}

module.exports = {
    compile,
    readsrcfile,
    getprojects,
    newproject
}
