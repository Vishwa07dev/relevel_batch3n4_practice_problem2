const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config")
const User = require("../models/user.model")
const Order = require("../models/order.model")
const constants = require("../utils/constants")

/**
 * Define verifyToken function
 */

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    /**
     * check if the token is provided
     */

    if(!token){
        return res.status(403).send({
            message: "No token provided ! Access denied.",
        })
    }

    /**
     * Validate the token.
     */
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: "UnAuthorized ! Token verification failed."
            })
        }
        req.userId = decoded.id; //Read the value of the user id from the token and set it in the request for further use
        next();
    })
}

/**
 * Define a function to check that requester is admin or not.
 */
const isAdmin = async (req, res, next) => {
    const user = await User.findOne({userId : req.userId});

    if(user.userId === "admin"){
        next();
    } else {
        res.status(400).send({
            message : " Only admin user allowed to access this endpoint. "
        })
    }
}

/**
 * To check if user Id provided in request param is valid
 */

const isValidUserIdReqParam = async(req, res, next) => {
    try{
        const user = User.findOne({userId : req.param.id});
        if(!user){
            return res.status(400).send({
                message: "Internal server error while reading user data"
            })
        }
        next();
    }catch(err){
        console.log("Error while reading the user info", err.messgae);
        return res.status(500).send({
            message : "Internal server error while reading the user data."
        })
    }
}

/**
 * To check if caller is Admin or Owner for the request.
 */
const isAdminOrOwner = async(req, res, next) => {
     try{
        
        const callingUser = await User.findOne({userId : req.userId});
         
        const order = await Order.findOne({"_id" : req.params.id});
        
        console.log(order)
        console.log(callingUser._id)
        console.log(order.customerId)
        
        const a = 5;
        const b = -12;

        console.log(a > 0 || b > 0);

        if(callingUser.userId === 'admin' || order.customerId.toString() == callingUser._id.toString()){
            next();
        } else {
            res.status(403).send({
                message: "Only ADMIN or the owner of Id is allowed to make this call"
            })
        }
    }catch(err){
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })
    }
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isValidUserIdReqParam : isValidUserIdReqParam,
    isAdminOrOwner : isAdminOrOwner
}

module.exports = authJwt;