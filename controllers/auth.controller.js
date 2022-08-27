const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const serverConfig = require('../configs/serverConfig')


exports.signup = async (req, res) => {

    try{

        const userObj = {
            name : req.body.name,
            userId : req.body.userId,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
            userType : req.body.userType
        }

        const user = await User.create(userObj)

        const response = {
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType
        }

        res.status(201).send(response);

    }catch(err){
        console.log("Error while signup* : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

exports.signin = async (req, res) => {
    try{

        const user = await User.findOne({userId : req.body.userId})
        if(!user){
            return res.status(400).send({
                message : "UserId is not valid"
            })
        }


        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(400).send({
                message : "Failed !! Wrong Password Provided !!!"
            })
        }

        const token = jwt.sign({id : user.userId}, serverConfig.SECRET_KEY, {expiresIn:600});

        let response = {
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            accessToken : token
        }

        res.status(200).send(response)
    

    }catch(err){
        console.log("Error while signin* : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};