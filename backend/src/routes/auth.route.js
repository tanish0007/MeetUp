import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

import { sendOtp, verifyOtp } from '../controllers/otp.controller.js';

const router = express.Router();


router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/onboarding', protectRoute, onboard);

router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});

export default router;