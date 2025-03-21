const jwt= require("jsonwebtoken")
const USER=require("../models/userModel")
const AsyncHandler = require("express-async-handler")

const Secure =AsyncHandler(async(req,res,next)=>{
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          token = req.headers.authorization.split(" ")[1];
    
          //decodes token id
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
          req.user = await USER.findById(decoded.id).select("-password");
    
          next();
        } catch (error) {
          res.status(401);
          throw new Error("Not authorized, token failed");
        }
      }
    
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
})

module.exports = {Secure}