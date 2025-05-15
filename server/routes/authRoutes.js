import express from 'express';
import passport from 'passport';
import { db } from '../config/db.js'; // Adjust path if needed

const router = express.Router();

// Google authentication route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    req.session.email = req.user.email;
    res.redirect("http://localhost:3000/#/app");
});

export default router;
