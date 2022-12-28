const mongoose = require('mongoose')
const { sourceCodeSchema } = require('./sourcecode')
const Schema = mongoose.Schema

// Ideally the list of projects would be a subdocument
// However, in this case we store the list project ids due to the nature of ShareDB

const classroomSchema = new Schema({
    title: {
        type: String
    },
    projectlist:[String]
},{timestamps: true})

module.exports = {
    classroomSchema
}