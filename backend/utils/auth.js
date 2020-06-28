require('dotenv').config();
const User=require('./../models/userModel');

const jwt=require('jsonwebtoken');

module.exports=async function (req,res,next) {
    const token=req.header('auth-token');
    if(!token) return res.status(401).send("Access denied");

    try{
        const verified=jwt.verify(token,process.env.SECRET);
        const user = await User.findOne({ _id: verified._id,'tokens.token': token });
        if (!user) {
            return res.status(401).send("User not found with given token!");
        }
        req.user=user;
        req.token=token;

        return next();
    }
    catch(err) {
        res.status(400).send("Invalid Token")
    }
}