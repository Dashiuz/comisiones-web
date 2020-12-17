const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const { ErrorHandler } = require("../middleware/errorHandler");

const secret_key = process.env.SECRET_KEY;

const signToken = (user) => {
  try {
    let newToken = jwt.sign({ user }, secret_key, { expiresIn: "30d" });
    return newToken;
  } catch (ex) {
    throw new ErrorHandler(403, "Error providing token");
  }
};

const VerifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret_key);
    req.userData = decoded;
    next();
  } catch (ex) {
    throw new ErrorHandler(403, "token verification failed");
  }
};

const isEmailValid = (email) => {
  let validate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validate.test(email);
};

module.exports = {
  signToken,
  VerifyToken,
  isEmailValid,
};
