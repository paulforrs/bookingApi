const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const Guest = require('./guest')

const reservationSchema  = new Schema({
        // guestId:{
        //     type: Number
        // },
        guest:{
            firstName: String,
            lastName: String,
        },
        checkInDate:{
            type: Date,
            require: true
        },
        checkOutDate:{
            type: Date,
            require:true
        },
        numOfGuest:{
            type: Number,
            require: true
        },
        numOfRooms:{
            type: Number,
            require: true
        },
        status:{
            type: String
        }
    },
    {
    timestamps: true
    }
)
// reservationSchema.pre("validate")
reservationSchema.pre('save', async function(){
    const guest = new Guest(this.guest)
    guest.reservations.push(this._id)
    await guest.save()
})


module.exports = mongoose.model("Reservation",reservationSchema)