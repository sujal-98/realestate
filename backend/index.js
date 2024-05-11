const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const userRoute=require('./routes/auth')


app.use(express.json())
app.use("/",userRoute)

mongoose.connect(process.env.uri).then(
    ()=>{
        console.log("connected to database")
    }

).catch(
    (error)=>{console.log(error);}
)
