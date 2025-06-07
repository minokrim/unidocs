import passport from 'passport';
import GoogleStrategy from "passport-google-oauth2";
import { db } from '../config/db.js';
import jwt from "jsonwebtoken"
if (!process.env.JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET is not defined!");
}
const configurePassport = () => {
console.log("GOOGLE_CLIENTID:", process.env.GOOGLE_CLIENTID); 
console.log("GOOGLE_CLIENTSECRET:", process.env.GOOGLE_CLIENTSECRET);
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL,
    proxy:true,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile.emails[0].value)
    try {
      let user;
      console.log("✅ Google profile received:", profile);

      const email = profile.emails[0].value;
      console.log("📬 Checking DB for:", email);

      let checkUser = await db.query("SELECT * FROM USERS WHERE EMAIL=$1", [email]);
      
      if (!checkUser.rows.length) {
        const newUser =await db.query("INSERT INTO USERS(EMAIL,PASSWORD) VALUES($1,$2) RETURNING *", 
          [email, "google"]);
           user = newUser.rows[0];
           console.log("🆕 Inserted user:", user);
      }
      else{
        user=checkUser.rows[0]
      }
      console.log("🔐 Signing JWT with secret:", process.env.JWT_SECRET);

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      user.token = token;
      console.log("✅ User ready, calling done:", user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};

export default configurePassport; 