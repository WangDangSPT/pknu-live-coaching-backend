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
    // user_owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
}, {timestamps: true})

const SourceCode = mongoose.model('SourceCode',sourceCodeSchema)
module.exports = {
    sourceCodeSchema,
    SourceCode
}