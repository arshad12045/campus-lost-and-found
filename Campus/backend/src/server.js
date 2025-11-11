import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.js';

dotenv.config();
const app=express();
app.use(helmet());
app.use(cors({origin:process.env.CORS_ORIGIN?.split(',')||'*'}));
app.use(express.json({limit:'2mb'}));
app.use(morgan('dev'));

const uri=process.env.MONGO_URI||'mongodb://127.0.0.1:27017/campus_lost_found';
mongoose.connect(uri).then(()=>{
  console.log('Mongo connected');
}).catch(e=>{console.error('Mongo error',e);process.exit(1)});

app.get('/api/health',(_,res)=>res.json({ok:true}));
app.use('/api/items',itemsRouter);

const port=process.env.PORT||4000;
app.listen(port,()=>console.log(`API on :${port}`));
