const express = require('express')
const app = express()
const User = require("./models/user.js")
require('dotenv').config()
require("./db/mongoose")
const port = process.env.PORT || 3000
// Routers
const userRouter = require('./routes/users.js')
const reservationRouter = require('./routes/reservations.js')
const guestRouter = require('./routes/guests.js')
const authRouter = require('./routes/auth.js')
// 

app.use(express.json())
app.use(userRouter)
app.use(reservationRouter)
app.use(guestRouter)
app.use(authRouter)


// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


module.exports =  app.listen(port, ()=>{
})
