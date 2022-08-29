const authController = require('../controllers/auth.controller')
const {verifySignUp} = require('../middlewares')

module.exports = (app)=>{
    app.post("/orderService/api/v1/users/signup", [verifySignUp.validateSignUpRequestBody], authController.signup)
    app.post("/orderService/api/v1/users/signin", [verifySignUp.validateSignInRequestBody], authController.signin)
}