const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {classroomSchema} = require('./classroom')

// instead of child referencing, we embed the projects into the user model

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    classroom:[classroomSchema]
}, {timestamps: true})

const User = mongoose.model('User',userSchema)
module.exports = User