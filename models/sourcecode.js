const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sourceCodeSchema = new Schema({
    title: {
        type: String
    },
    language_id: {
        type: Number,
        required: true
    },
    source_code: {
      type: String
    },
    
}, {timestamps: true})

module.exports = {
    sourceCodeSchema
}