const User = require("../models/user.model")
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")


/**
 * Code for Sign Up logic 
 */

exports.signUp = async (req, res) => {
    
    const userObj = {
        name : req.body.name,
        email : req.body.email,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password, 8),
    }

    try{

        const userCreated = await User.create(userObj);
        
        await userCreated.save();

        const response = {
            name : userCreated.name,
            email : userCreated.email,
            userId : userCreated.userId,
        }

        res.status(201).send(response);

    }catch(err){
        console.log("Some interal error", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}

/**
 * Code for Sign In logic
 */

exports.signIn = async (req, res) => {

    try{
    /**
     * If the userId passed is correct
     */
    const user = await User.findOne({userId : req.body.userId})

    if(user == null){
        console.log(user);
        return res.status(400).send({
            message: "SignIn Failed! UserId doesn't exist."
        });
    } 

    /**
     * If the password passed is not correct
     */
     const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
     console.log(isPasswordValid);

     if(!isPasswordValid){
        return res.status(401).send({
            message :"Invalid password."
        })
    }

    /**
     * Check if the user is in PENDING state
     */
    if(user.userStatus == constants.userStatuses.pending){
        return res.status(400).send({
            message : "Login failed! User is in pending state."
        })
    }
    
    /**
     * Create the JWT token
     */
    const token = jwt.sign({
        id : user.userId
    }, authConfig.secret,{
        expiresIn : 500
    });

    /**
     * Send the successfull login response
     */
     res.status(200).send({
        name : user.name,
        email : user.email,
        userId : user.userId,
        userStatus : user.userStatus,
        accessToken : token
    });
    }catch(err){
        console.log("some internal error happen", err.message)
        res.status(500).send({ message : "Internal server error" })
    }
}


