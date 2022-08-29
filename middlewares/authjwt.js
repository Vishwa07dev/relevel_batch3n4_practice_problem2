const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config')
const User = require('../models/user.model')
const constants = require('../utils/constants')


const verifyToken = async (req,res,next)=>{
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "no token provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised!"
            })
        }
        const user = await User.findOne({userId : decoded.id});
        req.user = user;
        next();
    })
}

const isAdmin = (req,res,next)=>{

    const user = req.user

    if (user && user.userType == constants.userType.admin){
        next();
    }else{
        return res.status(403).send({
            message : "only ADMIN users are allowed to access this endpoint"
        })
    }
}

const isAdminOrOwner = async (req,res,next)=>{
    try {
        const callingUser = req.user;
        if(callingUser.userType==constants.userType.admin || callingUser.userId == req.params.userId){
            next();
        }else{
            return res.send(403).send({
                message : "Only admin or owner is allowed to make this call"
            })
        }
    }catch(err){
        console.log("#### Error while reading the user info ####", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the user data"
        })
    }

}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrOwner : isAdminOrOwner
}

module.exports = authJwt