const express = require('express')
const notes = require('./data/notes')
const dotenv=require('dotenv')
const DBconnect = require('./config/db')
const  userRoute = require("./routes/userRoute")
const  noteRoute = require("./routes/noteRoute")
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
const path=require("path")
const app=express()
dotenv.config()
DBconnect()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("API is Running")
})

// app.get('/api/notes',(req,res)=>{
//     res.json(notes)
// })

app.use("/api/users",userRoute)
app.use("/api/notes",noteRoute)
// This is For Deployment
const __dirname1=path.resolve()
app.use(notFound)
app.use(errorHandler)

const PORT =process.env.PORT || 5000
app.listen(PORT,console.log(`Your Server is  Running on PORT : ${PORT}`))