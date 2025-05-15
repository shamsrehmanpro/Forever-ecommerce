
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//route for user login
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email})
        if (!user) {
            res.json({success:false, message:"user doesnot exist"})
        }

        const isMatch =  await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.json({success:false, message:"invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
}

//route for user registration
const registerUser = async (req, res) => {
    try {

        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
       
        // Check if required fields exist
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'All fields are required' });
        }
        
        //check if email exist
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: 'user is already exist' })
        }

        //check email and password format 
        if (!validator.isEmail(email)) {
            res.json({ success: false, message: 'please enter a valid email' })
        }
        if (password.length < 8) {
            res.json({ success: false, message: 'please enter strong password' })
        }

        //hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save()

        //create token
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        
        res.json({success : false, message:'error'})
    }
}

//route for admin login 
const adminLogin = async (req, res) => {
    const {email, password} = req.body
    try {
        if (email == process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"invalid cradentials"})
    }
}

export { loginUser, registerUser, adminLogin }