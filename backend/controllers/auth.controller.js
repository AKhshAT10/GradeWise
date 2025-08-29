import {generateToken} from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import {User} from '../models/user.model.js';



export const signup = async (req,res) => {
    const {fullName , email , password} = req.body;
    try{

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }

        const existingUser = await User.findByEmail(email);
        if(existingUser){
            return res.status(400).json({message:"Email Already Exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create(email,fullName,hashedPassword);

        if(!newUser){
            return res.status(400).json({message:"Invalid User Data"});
        }

        generateToken(newUser.id,res);

        res.status(201).json({
            id: newUser.id,
            fullName: newUser.full_name,
            email: newUser.email,
            profilePic: newUser.profile_pic,
        });

    }catch(error){
        console.error("Error in signup Controller:",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};