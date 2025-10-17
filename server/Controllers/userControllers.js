import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


// const generateAccessAndRefreshToken = async (userId) =>{
//   try {
//     const user = await User.findById(userId);
    
//   } catch (error) {
//     throw new Error("Something went wrong while generating tokens");
//   }
// }

export const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    picture,
  });

  res.status(200).json({ message: "User is created...", User: user });
});


export const AuthUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existUser = await User.findOne({ email });

  if (!existUser) {
    return res.status(404).json({ message: "User is Not Exists" });
  }

  const comparePassword = await bcrypt.compare(password, existUser.password);

  if (!comparePassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ _id: existUser._id }, process.env.SECRET_KEY, {expiresIn: '1d'});

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax", // or 'None' if cross-site
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({message:"Login successfully", token: token, existUser})
});


export const Logout_user = asyncHandler(async (req,res) =>{
  
  res.clearCookie("token",{
    httpOnly:true,
    secure:true,
    sameSite:"none"
  });

  return res.status(200).json({message:"Logout Successfully"})
})


export const All_users = asyncHandler(async (req,res) =>{
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // $ne selects the documents where the value of the specified field is not equal to the specified value. This includes documents that do not contain the specified field.

  console.log(req.user?._id);
  const users = await User.find(keyword).find({_id: {$ne: req.user?._id}});
  res.send(users);
})
