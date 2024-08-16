import jwt  from "jsonwebtoken";
import User from '../Models/userModel.js'
import asyncHandler from "express-async-handler";

const protect = async (req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized to access this route , Token Failed')
        }
    } 

}

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
      return next();
    }
    else{
        res.status(401)
        throw new Error('You are not Admin!');
    }
}

export {protect , admin}