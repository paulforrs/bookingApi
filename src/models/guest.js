const mongoose = require("mongoose")
const validator = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
const Schema = mongoose.Schema

const guestSchema = new Schema({
    firstName:{
        type: String,
        trim: true,
        require: true
    },
    lastName:{
        type: String,
        trim:true,
        require:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate:[isEmail, "Please enter a valid email"]
    },
    reservations: [{type: Schema.Types.ObjectId}]
})

const Guest = mongoose.model("Guest", guestSchema)

// guestSchema.methods.isNewGuest = async function(){
//     const guest = await Guest.findOne(this.firstName)
//     if(guest.lastName = this.lastName){
//         console.log("old guest")
//        return false 
//     }
//     console.log("new GUest")
//     return true
// }
module.exports = Guest