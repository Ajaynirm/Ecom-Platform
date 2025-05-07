import express from "express"
import dotenv from 'dotenv'; 

dotenv.config()
const port=process.env.PORT;

const app=express();

app.listen(11000,()=>console.log(`server listening on ${port}`))