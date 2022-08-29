const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Config = require("./config/config")
const User = require("./model/user.model");
const Order = require("./model/order.model");
const bodyParser = require("body-parser");


/**Register the body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Initialize the connection to the mongoDB
 */
 mongoose.connect(Config.DB_URL);
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
      await User.collection.drop();
      await Order.collection.drop();
      
      const adminUser = await User.create({
        name: "admin",
        userId: "admin",
        password: bcrypt.hashSync("Welcome1", 8),
        email: "admin@email.com",
        userType: "ADMIN",
      });
  
      
  
      console.log(adminUser);
    
    }catch (err) {
      console.log("err in db initialization , " + err);
    }
    
  }
  
  require("./routes/auth.route")(app);
  require("./routes/order.route")(app);
app.listen(Config.PORT, ()=>{
    console.log("Started the server on the port number : " ,Config.PORT)
  });