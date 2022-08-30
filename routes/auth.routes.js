const userController = require('../controllers/auth.controller');
const {verifySignUp , authJwt} = require('../middlewares');
module.exports = (app)=>{

    app.post("/orderService/api/v1/auth/signup",[verifySignUp.validateSignUpRequestBody],userController.signUp);

    app.post("/orderService/api/v1/auth/signin",[verifySignUp.validateSignInRequestBody],userController.signIn);

}
