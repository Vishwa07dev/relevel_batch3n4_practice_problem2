const User = require('../models/user.model');
const authConfig = require('../configs/auth.config');
const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
const verifyToken = (req, res, next)=>{

    const token = req.headers["x-access-token"];

    if(!token){
        res.status(403).send({
            message : "No token privided ! Access prohibited"
        });
        return;
    }
    
    jwt.verify(token, authConfig.secret,(err,decoded)=>{
        if(err){
            res.status(401).send({
                message : "UnAuthorized !"
            });
        }
        req.userId = decoded.id;
        next();
    })
}

const isAdmin = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == userTypes.admin){
        next();
    }else{
        res.status(403).send({
            message : "Only Admin User are Allowed to Access This "
        })
    }
}

const isAdminOrOwner = async ( req, res, next )=>{
    try{
        const user = await User.findOne({userId : req.userId});

        if(user.userType == constants.userTypes.admin || user.Orders.includes(req.params.id)){
            req.user = user;
            next();
        }else{
            res.status(400).send({
                message : "Only Admin and Owner allow to the end-point !"
            })
        }
    }catch(err){
        console.log("Some internal error while checking the is owner or admin",err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
    isAdminOrOwner
}

module.exports = authJwt;