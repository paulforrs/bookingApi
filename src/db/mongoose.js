const mongoose = require("mongoose")
const dotenv = require('dotenv')
const express = require('express');
const app = express()
const cors = require('cors');

const path = require('path')
const envPath = path.join(__dirname,'../.env')
dotenv.config({path: envPath})
database = "test"
// 
app.use(cors());
const MONGODB_PASS = process.env.MONGODB_PASS
const url = `mongodb+srv://admin_user:${MONGODB_PASS}@basiliaguesthouse.klhinvw.mongodb.net/${database}?retryWrites=true&w=majority`
mongoose.connect(url,{})
.then(()=>{})
.catch((error)=>console.log(error))
