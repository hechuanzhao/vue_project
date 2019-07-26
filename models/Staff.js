const mongoose = require('mongoose')
const Schema = mongoose.Schema
    //Create Schema
const StaffSchema = {
    name: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    state: {
        type: String,
    },
    hobby: {
        type: String
    },
    marriage: {
        type: String,
    },
    birthday: {
        type: String,
    },
    address: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
}

module.exports = Staff = mongoose.model("staff", StaffSchema)