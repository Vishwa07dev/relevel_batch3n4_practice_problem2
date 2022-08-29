const authcontroller = require("../controllers/auth.controller")
const {verifySignUp} = require("../middlewares")

module.exports = (app) => {

    app.post("/orderservice/api/v1/auth/signup", verifySignUp.validateSignupRequestBody,  authcontroller.signUp)


    app.post("/orderservice/api/v1/auth/signin", verifySignUp.validateSignInRequestBody, authcontroller.signIn);
}