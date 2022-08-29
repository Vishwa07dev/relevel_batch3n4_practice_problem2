const authController = require("../controllers/auth.controller");
const {verifyAuth} = require("../middlewares/index")

module.exports = (app) => {
    app.post("/courier_service/api/v1/signup",[verifyAuth.validateSignUpRequestBody], authController.singup);
    app.post("/courier_service/api/v1/signin", [verifyAuth.validateSignInRequestBody], authController.signin);
}