const mongoose = require("mongoose")
const dotenv = require('dotenv')

const path = require('path')
const envPath = path.join(__dirname,'../.env')
dotenv.config({path: envPath})
database = "test"
// 
const MONGODB_PASS = process.env.MONGODB_PASS
const url = `mongodb+srv://admin_user:${MONGODB_PASS}@basiliaguesthouse.klhinvw.mongodb.net/${database}?retryWrites=true&w=majority`
mongoose.connect(url,{})
.then(()=>{console.log("mongoose connected")})
.catch((error)=>console.log(error))
