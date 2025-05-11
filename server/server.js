import express from 'express';
import { connectDB } from './config/db.js';
import passport from 'passport';
import GoogleStrategy from "passport-google-oauth2";
import session from 'express-session'; 
import multer from 'multer';
import env from "dotenv";
import cors from "cors"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';
import mime from "mime-types"
import bcrypt from "bcrypt";
import pdfRoutes from './routes/pdfRoute.js';
import  createfolderRoutes from "./routes/createFolderRoute.js"
import audioRoutes from "./routes/pdfRoute.js"
import mergeRoutes from "./routes/pdfRoute.js"

env.config();

await connectDB();

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
const __dirname = dirname(fileURLToPath(import.meta.url));

const secretKey=process.env.ILOVEPDF_SECRET
const publicKey=process.env.ILOVEPDF_PUBLIC;

const ilovepdf = new ILovePDFApi(publicKey, secretKey);

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true                
  }));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000*60*60*24},
    })
  );

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
      const mimeType = mime.lookup(filePath);  
      
      if (mimeType) {
        res.type(mimeType);  
      } else {
        res.type('application/octet-stream');
      }
    }
  }));

// const db = new pg.Client({
//     user: process.env.POSTGRES_USER,
//     host: process.env.POSTGRES_HOST||'db',
//     database: process.env.POSTGRES_DATABASE,
//     password: process.env.POSTGRES_PASSWORD,
//     port: process.env.POSTGRES_PORT||5432,
//   });

  
// db.connect();

const saltRounds = 10;

app.post("/upload/file/metadata",upload.single("file"),async(req,res)=>{
    const metadata=req.body.metadata;
    const filePath=req.file.path;
    const filename=req.file.originalname;

    try{
        const fileupload= await db.query("INSERT INTO DOCUMENTS(FILENAME,FILEPATH,METADATA) VALUES($1,$2,$3)",[filename,filePath,JSON.stringify(metadata)])
        res.status(201).send("Document upload successful")
    }
    catch(err){
        res.status(500).send("Failed to upload document");
    }
})

app.use('/', createfolderRoutes);

app.get("/folder/data",async(req,res)=>{
    try {
        const data=await db.query("SELECT * FROM FOLDERS")
        res.send(data)
    } catch (error) {
        res.status(500).send("Failed to get data from DB")
    }
})

app.use('/', pdfRoutes);

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

app.use("/",audioRoutes);


app.use('/', mergeRoutes);


app.get("/document/data",async(req,res)=>{
    try {
        const data=await db.query("SELECT * FROM DOCUMENTS")
        res.send(data)
    } catch (error) {
        res.status(500).send("Failed to get data from DB")
    }
})

app.get("/document/filedata",async(req,res)=>{
    const fileid=req.query.fileid;

    const id = parseInt(fileid, 10);

    try {
        const data=await db.query("SELECT * FROM DOCUMENTS WHERE id=$1",[id])
        console.log("File fetched from DB:", data.rows);  

        if(data.rows.length===0){
            return res.status(404).send("Document not found");
        }
        const fileData=data.rows[0];
        const filePath = path.resolve(__dirname, fileData.filepath); 

        res.download(filePath, fileData.filename);
    } catch (error) {
        res.status(500).send("Failed to get data from DB")
        console.error("Error fetching file:", error);  

    }
})

app.get("/database/details", async (req, res) => {
    let user_email = req.session.email;
    try {
      const result = await db.query("SELECT * FROM USERS WHERE EMAIL=$1", [user_email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
  
        user.profile_pic_url = `http://localhost:5000/uploads/${user.profile_pic}`;

  
        res.status(200).json(user);
      } else {
        res.status(400).json("Invalid email. Please sign up or use the correct email.");
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json("Internal server error.");
    }
  });
  

app.post("/updated/details",upload.single('profile_pic'),async(req,res)=>{
    const email=req.body.email;
    const first_name=req.body.firstName;
    const profile_pic = req.file?.filename;
    const last_name=req.body.lastName;
console.log(email,first_name,profile_pic,last_name)
console.log("Received request:", req.body);


    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    try {   
        let user=await db.query("SELECT * FROM USERS WHERE EMAIL=$1",[email])
        if(user.rows.length>0){
            try {
                const update=await db.query("UPDATE USERS SET email=$1,first_name=$2,password=$3,profile_pic=$4,last_name=$5 where email=$6",[email,first_name,hashedPassword,profile_pic,last_name,email])
                res.status(200);
                res.json("db updated succesfully")
                console.log(update);
            } catch (error) {
                res.status(500);
                res.json("server error")
            }
        }

    } catch (error) {
        res.status(400);
        res.json("user does not exist")
    }
})

app.post("/upload/profile-pic", upload.single("profile_pic"), async (req, res) => {
    
    try {
        const filename = req.file.filename;  
        console.log(filename)
        res.status(200).json({ message: "Image uploaded successfully", filename });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: "Image upload failed" });
    }
});

app.get("/auth/google",passport.authenticate("google", {scope: ["profile","email"],})
  ); 

app.get( '/auth/google/callback',passport.authenticate( 'google', {}),(req,res)=>{
    req.session.email = req.user.email;
    res.redirect("http://localhost:3000/#/app")
}
);

app.get("/session/user",async(req,res)=>{
    if(req.session.email){
        res.json({ email: req.session.email })
        console.log({email:req.session.email})
    }
    else{
        res.status(401).json({ error: "No user logged in" })
    }
})

passport.use("google",new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENTID,
    clientSecret:process.env.GOOGLE_CLIENTSECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL,
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
},
async (accessToken, refreshToken,profile,done)=>{
    try{
        const email=profile.emails[0].value
        const checkUser= await db.query("SELECT * FROM USERS where EMAIL=$1",[email])
        if(checkUser.rows.length>0){
            console.log("login success")
        }
        else{
            const newUser=await db.query("INSERT INTO USERS(EMAIL,PASSWORD) VALUES($1,$2)",[profile.emails[0].value,"google"])
        }
        profile.email=email;
        
    }
    catch(err){
        console.log(err)
    }
    return done(null, profile); 

}
))

passport.serializeUser((user,cb)=>{
    cb(null,user)
})

passport.deserializeUser((user,cb)=>{
    cb(null,user)
})


app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})