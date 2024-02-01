const express = require('express')
const router = new express.Router()
const User = require("../models/user")

router.post('/api/users/new',(req, res)=>{
    try{
        const user = new User(req.body)
        user.save()
        .then(()=>{
            res.send(error)
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router