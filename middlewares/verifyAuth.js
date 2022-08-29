const User = require("../models/user.model");
const constants = require("../utils/constants");


const validateSignUpRequestBody = async (req, res, next) => {
    if(!req.body.name){
        return res.status(400).send({
            message : "Please provide the USER NAME and try again."
        })
    }
    
    if(!req.body.userId){   // validating whether the userId is present in the requet is exists already or not.
        return res.status(400).send({
            message : "Please provide the USER ID and try again."
        })
    }
    
    try{
        const user = await User.findOne({userId : req.body.userId});

        if(user){
            return res.status(400).send({
                message : `${req.body.userId} is already exists. Please try with other User Id.`
            });
        }
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error while signing up : ${err}`
        });
    }
    
    if(!req.body.password){
        return res.status(400).send({
            message : "Please provide the PASSWORD to create the account."
        })
    }

    if(!req.body.email){
        return res.status(400).send({
            message : "Please provide the EMAIL ID and try again."
        })
    }
    
    const isValidEmail = (email) => { // checking whether the email id is valid or not
        return String(email).toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/)
    }
    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : "Please provide the valid email id."
        })
    }
    
    try {
        const user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).send({
                message : `Already have an account associated with this email id : ${req.body.email}.`
            });
        }
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error while signing up : ${err}`
        });
    }
    
    const userTypes = [constants.userTypes.customer, undefined];
    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : `${req.body.userType} is a invalid User Type. You can sign up only as a customer.`
        })
    }
    
    next();
}


const validateSignInRequestBody = async (req, res, next) => {
    if(!req.body.userId){
        return res.status(400).send({
            message : "Please provide the User Id to Sign In."
        })
    }
    
    if(!req.body.password){
        return res.status(400).send({
            message : "Please provide the Password to Sign In."
        })
    }

    next();
}

module.exports = {validateSignUpRequestBody, validateSignInRequestBody};