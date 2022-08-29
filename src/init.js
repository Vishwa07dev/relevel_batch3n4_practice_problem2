const User = require('../src/models/user.model');
const Order = require('../src/models/order.model');
const bcrypt = require('bcryptjs');

module.exports = async () => {

    await User.collection.drop();
    await Order.collection.drop();

    try {
        const adminUser = await User.create({
            name: "admin",
            email: "admin@email.com",
            userId: "admin",
            password: bcrypt.hashSync("Welcome1", 8),
            userType: "ADMIN",
            userStatus: "APPROVED",
        });

        console.log(adminUser);

    } catch (err) {
        console.log("Error while initializing db", err.message);
        
    }
}