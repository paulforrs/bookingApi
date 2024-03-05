const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const Guest = require('./guest')
const { default: isEmail } = require("validator/lib/isEmail")


// object shape

const reservationSchema  = new Schema({
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
            },
            email:{
                type: String,
                required: true,
                trim: true,
                unique: true,
                lowercase: true,
                validate:[isEmail, "Please enter a valid email"]
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
        roomDetails:[
            {roomType: String,
            numberOfGuests: {
                adult: {
                    type: Number,
                    require: true
                },
                children: {
                    type: Number
                },
                pets:{
                    type: Number
                }
            } }
        ],
        totalCost:{
            type: Number,
            require: true
        },
        status:{
            type: String,
            default: "",
            required: true
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
    const guest = await Guest.findOne({firstName: newGuest.email})
    const dateNow = (new Date()).toDateString()
    const dateNowTime = (new Date(dateNow)).getTime()
    const checkInDateTime = (new Date(this.checkInDate)).getTime()
    const checkOutDateTime = (new Date(this.checkOutDate)).getTime()
    console.log(checkInDateTime, dateNowTime)
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
    if(dateNowTime < checkInDateTime){
        this.status = "Upcoming"
    }
    else if(dateNowTime >= checkInDateTime && dateNowTime < checkOutDateTime){
        this.status = "Currently Hosting"
    }

})


module.exports = mongoose.model("Reservation",reservationSchema)