const express = require("express");
const router = express.Router({ strict: true });
const { ErrorHandler } = require("../middleware/errorHandler");
const auth = require("../middleware/auth");
const userModel = require("../schemas/user");

router.get(`/verifyToken`, auth.VerifyToken, (req, res, next) => {
  try {
    return res.status(200).send({
      status: 200,
      success: true,
      msg: "the token has been validated successfully",
      validated: true,
    });
  } catch (ex) {
    throw new ErrorHandler(403, "token verification failed");
  }
});

module.exports = router;
