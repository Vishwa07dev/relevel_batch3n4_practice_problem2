const userController = require("../controllers/user.controller")
const {authJwt} = require("../middlewares")

module.exports = (app) => {

    app.put("/orderservice/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser)


   // app.put("/orderservice/api/v1/users", [authJwt.verifyToken], authcontroller.signIn);
}