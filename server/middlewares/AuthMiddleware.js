import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";


export const Protect = asynchandler(async (req,res,next) =>{
    let token;
    if(req.cookies && req.cookies.token){
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            req.user = decoded;

            next();
        } catch (error) {
            console.log(error.message);
            res.status(401).json({message: "Not authorized, token failed" });
        }
    }else{
        res.status(401).json({ message: "Not authorized, token failed" });
    }
})