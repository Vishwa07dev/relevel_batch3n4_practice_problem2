const express=require("express");
const app=express();
const bcrypt=require("bcryptjs")
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const User=require("./models/user.models")
const Order=require("./models/order.models")
const dbConfigs = require("./configs/db.configs");
const  serverConfig=require("./configs/server.config");
const constants=require("./utils/constant.util");
const orderModels = require("./models/order.models");
mongoose.connect(dbConfigs.DB_URL)

const db=mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to DB");
});
db.once("open",()=>{
    console.log("Connected....")
    init();
});

async function init()
{
    try{
        await User.collection.drop();
        await Order.collection.drop();

        const user=await User.create({
            name:"sandeep",
            userId:"sam",
            password:bcrypt.hashSync("Welcome1",8),
            email:"san123@gmail.com",
            userType:constants.userType.admin,
            userStatus:constants.userStatus.approved
        });
        console.log(user);
    }catch(err)
    {
        console.log("Error in Initialization in DB..",err.message);
    }
}
require("./routes/auth.routes")(app);
require("./routes/order.routes")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("Server is connected...",serverConfig.PORT)
})