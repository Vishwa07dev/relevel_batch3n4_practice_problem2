const userController = require('../controllers/user.controller');
const { authJwt } = require('../middlewares');


module.exports = (app) => {

    app.get("/orderService/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], userController.findAll);

    app.get("/orderService/api/v1/user/:id", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam ,authJwt.isAdminOrOwner,], userController.findByUserId);

    app.put("/orderService/api/v1/users/:id", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner], userController.update);


}