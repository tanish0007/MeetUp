import crypto from 'crypto';
import Otp from '../models/OTP.model.js';
import { sendOtpEmail } from '../utils/sendOTP.js';
import User from '../models/User.model.js';

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message: "Invalid email format"});
    }

    const otp = generateOtp();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.deleteMany({ email });

    await Otp.create({ email, otp: hashedOtp, expiresAt });

    await sendOtpEmail(email, otp);

    return res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("Error in sendOtp:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  try {
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const existingOtp = await Otp.findOne({ email, otp: hashedOtp });
    if (!existingOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (existingOtp.expiresAt < Date.now()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP has expired" });
    }

    await Otp.deleteMany({ email });

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error in verifyOtp:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
