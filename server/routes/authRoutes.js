import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google authentication route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"],prompt: "select_account"}));

// Google callback route
router.get("/google/callback",  (req, res, next) => {
    console.log("🔍 Callback route hit");
    next();
  }, passport.authenticate("google", { failureRedirect: "/",session:false }), (req, res) => {
  if (!req.user) {
      return res.redirect('no user in session');
    }
    console.log('Authenticated user:', req.user);

    try {
    req.session.email = req.user.email;
    console.log('Authenticated user:', req.user);
    res.redirect(`http://localhost:3000/#/app?token=${req.user.token}`);
    } catch (error) {
    console.error('Session error:', error);
    }
});

export default router;
