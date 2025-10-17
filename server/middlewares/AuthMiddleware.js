import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";
import User from '../Models/UserModel.js';


export const Protect = asynchandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  
  console.log("req.cookies:", req.cookies);
  console.log("req.headers.authorization:", req.headers.authorization);

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    const decoded_user = await User.findById(decoded._id);

    if (!decoded_user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    req.user = decoded_user;

    next();

    
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});
