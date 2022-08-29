const authController = require('../controllers/auth.controller');
const { verifySignUpAndSignInReqBody } = require('../middlewares');

module.exports = (app) => {
    /**
     * for signUp
     * 
     * Post request
     */
    app.post("/orderService/api/v1/auth/signup", [verifySignUpAndSignInReqBody.validateSignUpRequestBody], authController.signup);

    /**
     * signIn 
     * 
     * Post request
     */
    app.post("/orderService/api/v1/auth/signin", [verifySignUpAndSignInReqBody.validateSignInRequestBody], authController.signin);
}