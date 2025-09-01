import express from 'express';
import passport from 'passport';
import authRateLimiter from '../middlewares/rateLimiter.js';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"],prompt: "select_account"}));

router.get("/google/callback",authRateLimiter,  (req, res, next) => {
    next();
  }, passport.authenticate("google", { failureRedirect: "/",session:false }), (req, res) => {
  if (!req.user) {
      return res.redirect('no user in session');
    }

    try {
        const token = jwt.sign(
      { email: req.user.email, id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log(req.user.email)
    res.redirect(`https://unidocs-ukv1.onrender.com/#/app?token=${token}`);
    } catch (error) {
    console.error('Session error:', error);
    }
});

export default router;
