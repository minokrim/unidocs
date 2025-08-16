import express from 'express';
import { connectDB, db } from './config/db.js';
import passport from 'passport';
import session from 'express-session'; 
import multer from 'multer';
import env from "dotenv";
import cors from "cors"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';
import pdfRoutes from './routes/pdfRoute.js';
import  createfolderRoutes from "./routes/createFolderRoute.js"
import authRoutes from "./routes/authRoutes.js"
import configurePassport from './passport/googleStrategy.js';
import fileRoutes from "./routes/fileRoute.js"
import userRoutes from "./routes/userRoute.js"

env.config();

configurePassport();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});
const upload = multer({ storage: storage },)

const app =express();
const PORT=process.env.SERVER_PORT
app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true   ,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']             
  }));

// app.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: false,
//       cookie: { 
//         maxAge: 1000*60*60*24,
//         secure: process.env.NODE_ENV === 'production',
//         httpOnly: true,
//         sameSite: 'lax'
//       },
//     })
//   );

app.use(passport.initialize());
// app.use(passport.session());
const __dirname = dirname(fileURLToPath(import.meta.url));

const secretKey=process.env.ILOVEPDF_SECRET
const publicKey=process.env.ILOVEPDF_PUBLIC;

const ilovepdf = new ILovePDFApi(publicKey, secretKey);

await connectDB();



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is alive');
});

const serviceType = process.env.SERVICE_TYPE;


console.log(serviceType)
    // if(serviceType==="file"){
    // console.log(serviceType)
    // app.use('/file',fileRoutes)
    // } else if(serviceType==="folder"){
    // app.use('/folder', createfolderRoutes);
    // }else if(serviceType==="pdf"){
    // app.use('/pdf', pdfRoutes);
    // }else if(serviceType==="user"){
    // app.use("/user",userRoutes)
    // }else if(serviceType==="auth"){
    //   console.log(serviceType)
    // app.use("/auth", authRoutes);
    // }else if(serviceType==="upload"){
    // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    // }

    app.use('/document',fileRoutes)
    app.use('/folder', createfolderRoutes);
    app.use('/pdf', pdfRoutes);
    app.use("/user",userRoutes)
    app.use("/auth", authRoutes);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/session/user",async(req,res)=>{
    if(req.session.email){
        res.json({ email: req.session.email })
    }
    else{
        res.status(401).json({ error: "No user logged in" })
    }
})

app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})