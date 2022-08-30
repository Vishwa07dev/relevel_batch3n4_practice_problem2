const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const User = require('./models/user.model');
const Order = require('./models/order.model');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get('/',(req,res)=>{
    res.status(200).send({
        Message : "Hello World"
    })
})

mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
console.log("Connected to mongoDB");
    init();
});
async function init(){

    await User.collection.drop();
    await Order.collection.drop();

    const userObj = {

        name : "admin",
        userId : "admin",
        email : "test@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("admin",8)
    }
    const user = await User.create(userObj);
    console.log(user);
    const orderObj = {
        iteam : "TV",
        address : "Mumbai",
        totalCost: 20000,
        userId : user._id
    }
    const order = await Order.create(orderObj);
    console.log(order);

}
require('./routes/auth.routes')(app);
require('./routes/order.routes')(app);

app.listen(serverConfig.PORT,()=>{
    console.log(`Server is Started At PORT ${serverConfig.PORT}`);
})