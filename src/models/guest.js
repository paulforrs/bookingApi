const mongoose = require("mongoose")
const validator = require("validator")
const Schema = mongoose.Schema

const guestSchema = new Schema({
    firstName:{
        type: String,
        trim: true
    },
    lastName:{
        type: String,
        trim:true
    },
    reservations: Array
})

module.exports = mongoose.model("Guest", guestSchema)