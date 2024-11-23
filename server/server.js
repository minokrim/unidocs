import express from 'express';
import bodyParser from 'body-parser';
import pg from "pg"
import passport from 'passport';
import GoogleStrategy from "passport-google-oauth2";
import { Await } from 'react-router-dom';
import session from 'express-session'; 
import multer from 'multer';
import env from "dotenv";
import cors from "cors"

const upload = multer({ dest: 'uploads/' })
env.config();
const app =express();
const PORT=process.env.SERVER_PORT

app.use(cors({
    origin: 'http://localhost:3001',  
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
const db = new pg.Client({
    user: process.env.POSTGRES_USER,//default
    host: process.env.POSTGRES_HOST,//default
    database: process.env.POSTGRES_DATABASE,//name of database your table is in
    password: process.env.POSTGRES_PASSWORD,//created when settingup pg
    port: process.env.POSTGRES_PORT, //setup when you are setting up pg ususally 5432 i changed mine to 5433
  });
//get postgres credentails to link node and db

db.connect();//connecting node to pg

app.post("/upload",upload.single("document"),async(req,res)=>{
    const metadata=req.body;
    const filePath=req.file.path;
    const filename=req.body.filename

    try{
        const fileupload= await db.query("INSERT INTO DOCUMENTS(FILENAME,FILEPATH,METADATA) VALUES($1,$2,$3)",[filename,filePath,JSON.stringify(metadata)])
        res.status(201).send("Document upload successful")
    }
    catch(err){
        res.status(500).send("Failed to upload document");
    }
})

app.get("/database/useremail",async(req,res)=>{
    const email=await db.query("SELECT EMAIL FROM users")
})

app.get("/auth/google",passport.authenticate("google", {scope: ["profile","email"],})
  );

app.get( '/auth/google/callback',passport.authenticate( 'google', {}),(req,res)=>{
    req.session.email = req.user.email;
    res.redirect("http://localhost:3001")
}
);

app.get("/session",async(req,res)=>{
    if(req.session.email){
        res.json({ email: req.session.email })
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
}) //code to run backend server
//ensure backend is running on a different port from frontend
//ensure to define a type of module in package.js to ensure you can use iport statements