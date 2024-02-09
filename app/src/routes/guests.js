const express = require('express')
const router = new express.Router()
const Guest = require("../models/guest")

router.get('/api/guests', async (req, res)=>{
    try{
        Guest.find({})
        .then((response)=>{
            res.send(response)
        })
    }
    catch(err){

    }
})
router.post('/api/guests/new', async (req, res)=>{
    try{
        console.log(req.body)
        const guest = new Guest(req.body)
        await guest.save()
        res.send(guest)
    }
    catch(err){
        res.send(err)
    }
})
router.delete('/api/guests/:id', async (req, res)=>{
    try{
        const guest = await Guest.findByIdAndDelete(req.params.id)
        res.send(guest)
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router