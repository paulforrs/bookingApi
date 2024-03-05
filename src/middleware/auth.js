const User = require('../models/user')
const auth = async (req, res, next)=>{
    const timeNow = new Date()
    try {
        const token = req.header("Authorization").replace("Bearer ",'')
        const user = await User.findOne({'jti': token})
        const exp = user.exp *1000
        if(!user){
            res.status(401).send({error:"Please Authenticate"})
        }
        else if(timeNow > exp){
            res.status(401).send({error: "Token expired"})
        }
        else{
            next()
        }
        
    } catch (error) {
        res.status(401).send({error:"Please Authenticate"})
    }
}
module.exports = auth