const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const Guest = require('./guest')

const reservationSchema  = new Schema({
        // guestId:{
        //     type: Number
        // },
        guest:{
            guestId:{
                type: Schema.Types.ObjectId,
                require:true
            },
            firstName: {
                type: String,
                require: true
            },
            lastName:{
                type: String,
                require: true
            }
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
            adult: {
                type: Number,
                require: true
            },
            children: {
                type: Number
            }
        },
        totalCost:{
            type: Number,
            require: true
        },
        numOfRooms:{
            type: Number,
            require: true
        },
        status:{
            type: String,
            default: ""
        },
        note: String
    },
    {
    timestamps: true
    }
)
// reservationSchema.pre("validate")
reservationSchema.pre('save', async function(next){
    const newGuest = new Guest(this.guest)
    const guest = await Guest.findOne({"firstName": newGuest.firstName})
    // if guest already exist 
    if(!guest || !(guest.lastName === newGuest.lastName)){
        newGuest.reservations.push(this.id)
        await newGuest.save()
        this.guest.guestId = newGuest._id
        next()
        
    }else{
        // reservation guest is existing guest
        this.guest.guestId = guest
        guest.reservations.push(this._id)
        await  guest.save()
        next()
    }

})


module.exports = mongoose.model("Reservation",reservationSchema)