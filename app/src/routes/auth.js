const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const { MongoGridFSChunkError } = require('mongodb')

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

router.post('/api/signin', async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    
        res.status(200).send({message: "Login Successfull"})
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router