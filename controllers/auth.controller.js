const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../configs/auth.config');

exports.signUp = async(req, res)=>{
    
    try{
        const userObj = {
            name : req.body.name,
            userId : req.body.userId,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password,8),
        }
    
        const userCreated = await User.create(userObj);
        const response = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType
        }
        res.status(200).send({
            message : "Successfully SignUp",
            data : response
        })
    }catch(err){
        console.log('Some error while signup the user', err.message),
        res.status(500).send({
            message : "Some Internal Error"
        })
    }

}

exports.signIn = async (req, res)=>{
    try{
        const user = await User.findOne({userId : req.body.userId});
        if(user == null){
            res.status(400).send({
                message : "UserId is not exists !"
            });
            return;
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            res.status(401).send({
                message : "Password is Wrong !"
            })
        }
        
        const token = jwt.sign({
            id : user.userId
        }, authConfig.secret,{
            expiresIn : 600
        });

        res.status(201).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            type : user.userType,
            orders : user.Orders,
            accessToken : token
        })

    }catch(err){
        console.log('Some internal error while Log In the user', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}