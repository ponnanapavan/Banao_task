import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import dbConnect from './db/dbConnect.js';
import UserRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config();
dbConnect();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users',UserRoutes);




app.listen(4000,(req,res)=>{
    console.log("bfvfhbvfh")
})


