const User = require("../models/user.model");

const validateSignUpRequestBody = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Please provide the name !",
    });
    return;
  }
  if (!req.body.userId) {
    res.status(400).send({
      message: "Please provide the userId !",
    });
    return;
  }
  const user = await User.findOne({ userId: req.body.userId });
  if (user) {
    res.status(400).send({
      message: "UserId already Taken",
    });
  }
  if (!req.body.email) {
    res.status(400).send({
      message: "Please provide the email !",
    });
    return;
  }
  if (!isValidEmail(req.body.email)) {
    res.status(400).send({
      message: "Failed ! Not a valid email id",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Please provide the password !",
    });
    return;
  }
  next();
};
const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateSignInRequestBody = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "Failed ! UserId is not provided",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed ! Password is not provided",
    });
  }

  next();
};
const verifyRequestBodyForAuth = {
  validateSignUpRequestBody,
  validateSignInRequestBody,
};

module.exports = verifyRequestBodyForAuth;
