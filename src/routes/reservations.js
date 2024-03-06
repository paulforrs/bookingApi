const express = require('express')
const router = new express.Router
const Reservation = require('../models/reservation')
const auth = require("../middleware/auth")

// get all reservations
router.get('/api/reservations',auth, async (req,res)=>{
    try{
        Reservation.find({}).sort({checkIndate:-1, checkOutDate:-1})
        .then((response)=>{
            res.send(response)
        })
    }
    catch(err){
        res.send(err)
    }
})
// get upcoming guests
router.get('/api/reservations/upcoming',auth, async (req,res)=>{
    try{
        Reservation.find({status:"Upcoming"}).sort({checkIndate:-1, checkOutDate:-1})
        .then((response)=>{
            res.send(response)
        })
    }
    catch(err){
        res.send(err)
    }
})
// updates all resevation status
router.get('/api/reservations/sync', async(req, res)=>{
    const dateNowTime =new Date((new Date()).toDateString()).getTime()
    try {
        const past = await Reservation.updateMany({checkOutDate: {$lt: dateNowTime }},{status: "Past Guest"})
        // const current = await Reservation
        res.send(past)
    } catch (error) {
        
    }
})
// add new reservation
router.post('/api/reservations/new', async (req,res)=>{
    try{
        const reservation = new Reservation(
            req.body
        )
        await reservation.save()
        res.send(reservation)
    }
    catch(err){
        res.send(err)
    }
})
// updates reservations
router.patch('/api/reservations/:id', async (req, res)=>{
    try{
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

// deleting reservations
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