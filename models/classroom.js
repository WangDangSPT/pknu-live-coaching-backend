const mongoose = require('mongoose')
const { sourceCodeSchema } = require('./sourcecode')
const Schema = mongoose.Schema

const classroomSchema = new Schema({
    title: {
        type: String
    },
    projectlist:[sourceCodeSchema]
},{timestamps: true})

module.exports = {
    classroomSchema
}