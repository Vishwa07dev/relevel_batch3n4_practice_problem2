const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const serverConfig = require('../configs/serverConfig');
const constants = require('../utils/constants');
const Order = require('../models/order.model')


const verifyToken = (req, res, next) => {
    try{

    const token = req.headers["x-access-token"]

    if(!token){

        return res.status(403).send({
            message : "Failed !! Token is not Provided !!!"
        })
    }

    jwt.verify(token, serverConfig.SECRET_KEY, (err, decoded) => {

        if(err){
            return res.status(401).send({
                message : "Failed !! UnAuthorized !!!"
            })
        }
        req.userId = decoded.id 
        next()
    })

    }catch(err){
        console.log("Error in token valodation : ", err.message)
        res.status(500).send("Internal server error")
    }
    
};

const isAdminOrOwnerOfOrder = async (req, res, next) => {
    try{

        if(req.params.id.length !=24){
            return res.status(400).send({
                message : "Wrong order id given"
            })
        }

        const user = await User.findOne({userId : req.userId});
        const order = await Order.findOne({_id : req.params.id});

        if(!order){
            return res.status(400).send({
                message : "Wrong order id given"
            })
        }

        if(user.userType != constants.userType.admin){

            if(!order.customerId.equals(user._id)){

                return res.status(403).send({
                    message : "Only admin and owner can do this change"
                })
            }
        }
        next()

    }catch(err){
        console.log("error in validation isAdminOrOwnerOfOrder in params: ", err.message);
        res.status(500).send({
        message : "Internal Server Error"
        })
    }
}




const authRequestValidator = {
    verifyToken : verifyToken ,
    isAdminOrOwnerOfOrder : isAdminOrOwnerOfOrder
}

module.exports = authRequestValidator;