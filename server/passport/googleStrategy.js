// config/passport.js (recommended separate file)
import passport from 'passport';
import GoogleStrategy from "passport-google-oauth2";
import { db } from '../config/db.js';
const configurePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const checkUser = await db.query("SELECT * FROM USERS WHERE EMAIL=$1", [email]);
      
      if (!checkUser.rows.length) {
        await db.query("INSERT INTO USERS(EMAIL,PASSWORD) VALUES($1,$2)", 
          [email, "google"]);
      }
      
      return done(null, profile);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};

export default configurePassport;