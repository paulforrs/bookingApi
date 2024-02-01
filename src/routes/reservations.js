const express = require('express')
const router = new express.Router
const Reservation = require('../models/reservation')
const guestRouter = require('../routes/guests')
const Guest = require('../models/guest')

router.get('/api/reservations',async (req,res)=>{
    try{
        Reservation.find({})
        .then((response)=>{
            res.send(response)
        })
    }
    catch(err){
        res.send(err)
    }
})
router.post('/api/reservations/new', async (req,res)=>{
    try{
        const {guest,numOfGuest,numOfRooms} = req.body
        const checkInDate = new Date()
        const checkOutDate = new Date("October 13, 2025 11:13:00")
        const reservation = new Reservation({
            guest,
            numOfRooms,
            numOfGuest,
            checkInDate,
            checkOutDate
        })
        
        await reservation.save()
        res.send(reservation)
    }
    catch(err){
        res.send(err)
    }
})
router.patch('/api/reservations/:id', async (req, res)=>{
    try{
        console.log(req.params.id)
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        if(!reservation){
            return res.status(404).send("Reservation not Found")
        }
        res.send(reservation)
    }
    catch(err){
        res.send(err)
    }
})
router.delete('/api/reservations/:id', async (req, res)=>{
    try{
        const reservation = await Reservation.findByIdAndDelete(req.params.id)
        if(!reservation){
            return res.status(404).send('Reservation not found')
        }
        res.send(reservation)
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router