const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    project_ids: [Schema.Types.ObjectId]
}, {timestamps: true})

const User = mongoose.model('User',userSchema)
module.exports = User