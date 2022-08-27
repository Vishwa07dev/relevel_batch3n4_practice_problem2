const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const serverConfig = require('./configs/serverConfig');
const User = require("./models/user.model");
const Order = require('./models/order.model')
const constants = require('./utils/constants')


/**
 * Initialize the connection to the mongoDB
 */
mongoose.connect(serverConfig.DB_URI);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
  init();
});

/**
 * Create the ADMIN user at the boot time
 */
async function init() {
    try {
        await User.collection.drop()
        await Order.collection.drop()

        const user = await User.create({
            name: "admin",
            userId: "admin",
            password: bcrypt.hashSync("admin", 10),
            email: "admin@gmail.com",
            userType: constants.userType.admin
        })
        console.log(user)

    } catch (err) {
        console.log("err in db initialization , " + err);
    }
}

require('./routes/auth.route')(app);
require('./routes/order.route')(app)


app.listen(serverConfig.PORT, () => {
  console.log("app is runing at port : " , serverConfig.PORT)
})