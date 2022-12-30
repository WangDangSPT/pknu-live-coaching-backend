const res = require('express/lib/response')
const axios = require('axios')
const SourceCode = require('../models/sourcecode')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const ShareDB = require('sharedb')
const backend = require('../bin/www')
const uuid = require('uuid')

const compile = async (req,res)=>{
    try{
        // pull project from mongo
        const user = User.find({_id: req._id,username: req.username})
        const project = user.projects.id(req.query._id)
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
            data: {
                source_code: project.source_code,
                language_id: project.language_id
            }
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
            }
          };
        let output = await axios(optionGet)
        res.status(200).json(output)
    }catch(error){
        console.error(error)
        res.status(404).send(error)

    }

}
const getAllClassrooms = async(req,res)=>{
    // Classroom Dashboard
    try{
        const user = await User.find({_id: req._id, username: req.username})
        res.status(200).send(user.classroom)
    } catch(error){
        console.error(error)
        res.status(500).send({error: error})
    }
}

const newClassroom = async()=>{
    try{
        const user = await User.find({_id: req._id, username: req.username})
        await user.classrooms.push({title: req.classroomtitle})
        const output = await user.save()
        res.status(200).send(output)
        }catch(error){
            console.error(error)
            res.status(500).send({error: error})
        }
}

const getAllProjects = async(req,res)=>{
    // recieves input of an array of project ids owned by a classroom and outputs an array of projects
    // Project DashBoard
    try{
        const classroomProjects = req.projects
        const output=[]
        for(const projectid of classroomProjects){
            const project = await SourceCode.find({_id: projectid})
            output.push(project)
        } 
        res.status(200).send(output)
    }catch(error){
        console.error(error)
        res.status(500).send({error: error})
    }
        
}

const newproject = async(req,res)=>{
    // using ShareDB's API
    // generate UUID
    const connection = backend.connect()
    const id = uuid.v5()
    const doc = connection.get('sourcecode',id)
    doc.fetch(function(err){
        if(error)throw err;
        if(doc.type === null){
            doc.create({content: 'Hello World!',title: req.title ,lang:req.language_id})
            return
        }
    })
}

module.exports = {
    compile,
    getAllClassrooms,
    newClassroom,
    newproject,
    getAllProjects
}
