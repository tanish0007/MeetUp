import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.model.js'
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { email, password, fullName } = req.body;

    try{
        if(!email || !password || !fullName) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must contain atleast 8 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({messages: "Invalid email format"});
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "Email already exists, Please use a different one!!"})
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        });

        try{
            await upsertStreamUser ({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            });
            console.log(`Stream user created for ${newUser.fullName} (${newUser._id})`);
        } catch (err) {
            console.log(`Error creating stream user: ${err}`);
        }

        

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, { expiresIn : "3d" });
        res.cookie("jwt", token, {
            maxAge: 1000*60*60*24*3,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })

        return res.status(201).json({
            success: true,
            user: newUser
        })

    } catch (error) {
        console.log('error: ',error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required !!"});
        }

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({ message: "Invalid email"});

        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect) return res.status(401).json({message: "Invalid Password"});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, { expiresIn : "3d" });
        res.cookie("jwt", token, {
            maxAge: 1000*60*60*24*3,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })

        return res.status(201).json({
            success: true,
            user
        })

    } catch (err) {
        console.log(`Error in login controller: ${err}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({success: true, message: "Logout Successful"});
}

export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location ) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && 'bio',
                    !nativeLanguage && 'nativeLanguage',
                    !learningLanguage && 'learningLanguage',
                    !location && 'location'
                ].filter(Boolean)
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true
        }, {new: true});

        if(!updatedUser) return res.status(404).json({message: "User not found"});

        try { 
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
            console.log(`Strem user updated after onboarding for ${updatedUser.fullName}`)
        } catch (stremError) {
            console.log('Error in updating stream user during onboarding: ', stremError.message)
        }

        res.status(200).json({success: true, user: updatedUser});

    } catch (error) {
        console.error("Onboarding error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}