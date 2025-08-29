import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './lib/db.js';


const app = express();
const PORT = process.env.PORT;
   

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});