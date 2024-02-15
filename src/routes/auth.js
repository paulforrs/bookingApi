const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/api/signup', async(req, res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        res.send(user)
    }
    catch(error){
        res.send(error)
    }

})

router.patch('/api/signin', async(req, res)=>{
    try{
        const {email} = req.body
        const user = await User.findOneAndUpdate({"email":email}, req.body,{new: true,upsert: true})

        // if(!user || !(await user.comparePassword(password))){
        //     return res.status(401).json({ error: 'Invalid username or password' });
        // }
        console.log(user)
        res.status(400).send(user)
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router