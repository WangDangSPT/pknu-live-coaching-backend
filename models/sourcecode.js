const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sourcecodeSchema = new Schema ({
    _id: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    language_id: {
        type: Number
    },
    _type:{
        type: String
    },
    _v: {
        type: String
    },
    _m:{
        ctime: {
            type: Number
        },
        mtime: {
            type: Number
        }
    },
    _o: {
        type: Schema.Types.ObjectId
    }

})

const SourceCode = mongoose.model('SourceCode',sourcecodeSchema)
module.exports = SourceCode