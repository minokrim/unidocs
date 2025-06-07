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

console.log("GOOGLE_CLIENTID:", process.env.GOOGLE_CLIENTID);
console.log("GOOGLE_CLIENTSECRET:", process.env.GOOGLE_CLIENTSECRET);

configurePassport();



// await connectDB();

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

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 1000*60*60*24,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
      },
    })
  );

app.use(passport.initialize());
app.use(passport.session());

const __dirname = dirname(fileURLToPath(import.meta.url));

const secretKey=process.env.ILOVEPDF_SECRET
const publicKey=process.env.ILOVEPDF_PUBLIC;

const ilovepdf = new ILovePDFApi(publicKey, secretKey);

await connectDB();

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true   ,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']             
  }));

app.use(express.json());


app.get("/getusers",async(req,res)=>{
  try {
      const result=await db.query("SELECT * FROM USERS")
      console.log(result.rows)
  } catch (error) {
    console.log(error)
  }
})


app.use('/',fileRoutes)

app.use('/', createfolderRoutes);

app.use('/', pdfRoutes);

app.use("/",userRoutes)

app.use("/auth", authRoutes);

app.post("/file/edit",upload.single("file"),async(req,res)=>{
    const filepath=req.file.path;

    try {
        const task = ilovepdf.newTask("editpdf");
        await task.start();

        const file = new ILovePDFFile(path.resolve(__dirname, filepath));

        await task.addFile(file);

        const textElement = new Text({
            coordinates: { x: 100, y: 100 },
            dimensions: { w: 100, h: 100 },
            text: 'test',
        });
        await task.addElement(textElement);
        await task.process();
        const data=await task.download();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');

        res.send(data);

    } catch (error) {
        
    }
})

app.get("/",(req,res)=>{
  res.json("welcome")
})
db.query("SELECT * FROM users")
  .then(res => console.log(res.rows,"dddd"))
  .catch(err => console.error("DB ERROR", err));

app.get("/session/user",async(req,res)=>{
    if(req.session.email){
        res.json({ email: req.session.email })
        console.log({email:req.session.email})
    }
    else{
        res.status(401).json({ error: "No user logged in" })
    }
})

app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})