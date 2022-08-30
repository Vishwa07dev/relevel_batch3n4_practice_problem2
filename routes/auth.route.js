const authController = require("../controller/auth.controller");
const {verifySignUp} = require("../middleware");

module.exports = (app)=>{
    app.post("/orderService/api/v1/auth/signup",[verifySignUp.validateSignUpRequestBody],authController.signup);

    // LOGIN

 app.post("/orderService/api/v1/auth/signin",[verifySignUp.validateSigninRequestBody],authController.signin);
}