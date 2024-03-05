const express = require('express')
const router = new express.Router
const Reservation = require('../models/reservation')
const auth = require("../middleware/auth")

// get all reservations
router.get('/api/reservations',auth, async (req,res)=>{
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