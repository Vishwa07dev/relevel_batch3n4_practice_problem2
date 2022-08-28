const authController=require("../controllers/auth.controllers");

module.exports=(app)=>{
    app.post("/crm/api/v1/singup",authController.singUp);
    app.post("/crm/api/v1/singin",authController.singIn)

}