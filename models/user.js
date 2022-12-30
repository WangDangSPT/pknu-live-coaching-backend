const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    classrooms:[{
        title: {
            type: String
        },
        projects: [Schema.Types.ObjectId]
    }]
}, {timestamps: true})

const User = mongoose.model('User',userSchema)
module.exports = User