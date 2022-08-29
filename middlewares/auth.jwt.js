const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");
const User = require("../models/user.model");


const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "Login to continue."
        });
    }
    
    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : "unauthorized!"
            });
        }
        req.userId = decoded.id; // decodes the userId from the token and assigning it to the req.body for further use.
        next();
    })
}

// const isAdmin = async (req, res, next) => {
//     const callingUser = await Customer.findOne({customerId : req.customerId});

//     if(callingUser.userType === constants.userTypes.admin){
//         next();
//     }
//     else{
//         return res.status(403).send({
//             message : "Only admin can request for this."
//         });
//     }
// }


// const isAdminOrOwner = async (req, res, next) => {
//     try{
//         const callingUser = await User.findOne({userId : req.userId});

//         if(callingUser.userType == constants.userTypes.admin || callingUser.userId == req.params.id){
//             next();
//         }
//         else{
//             return res.status(403).send({
//                 message : "Only the admin or the owner are allowrd to make this request."
//             })
//         }
//     }
//     catch(err){
//         return res.status(500).send({
//             message : "Internal server error. Please try again."
//         })
//     }
// }

module.exports = {verifyToken};