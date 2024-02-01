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


app.listen(port, ()=>{
    console.log("listening to port " + port)
})