const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')

app.use(express.json())
mongoose.connect(process.env.uri).then(
    ()=>{
        console.log("connected to database")
    }

).catch(
    (error)=>{console.log(error);}
)
