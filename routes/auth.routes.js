const authController=require("../controllers/auth.controllers");
const {authSign}=require("../middelware/index")
module.exports=(app)=>{
    app.post("/crm/api/v1/signup",[authSign.signUp],authController.signUp);
    app.post("/crm/api/v1/signin",[authSign.signIn],authController.signIn)

}