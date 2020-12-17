const express = require("express");
const router = express.Router({ strict: true });
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const { ErrorHandler } = require("../middleware/errorHandler");
const auth = require("../middleware/auth");
const userModel = require("../schemas/user");

/**REGISTER USER */
router.post(`/register`, (req, res, next) => {
  if (req.body.password && req.body.email) {
    let obj = {};
    let encryptedPass = bcrypt.hashSync(req.body.password);
    let validatedEmail = auth.isEmailValid(req.body.email);

    if (validatedEmail && encryptedPass) {
      obj = {
        email: req.body.email,
        password: encryptedPass,
      };

      let user_model = new userModel(obj);

      user_model
        .save()
        .then((result) => {
          let data = {
            email: result.email,
            createdAt: result.createdAt,
          };
          return res.status(200).send({
            status: 200,
            success: true,
            msg: "The user has been registered successfully",
            data,
          });
        })
        .catch((ex) => {
          next(ex);
        });
    } else {
      throw new ErrorHandler(409, "Invalid email format");
    }
  } else {
    throw new ErrorHandler(409, "Provide an email and password");
  }
});

/**LOG IN THE USER */
router.post(`/login`, async (req, res, next) => {
  try {
    if (req.body.password && req.body.email) {
      let userInput = {
        email: req.body.email,
        password: req.body.password,
      };

      let dbuser = await userModel.findOne({ email: userInput.email }).exec();

      if (dbuser) {
        let decryptedPass = bcrypt.compareSync(
          userInput.password,
          dbuser.password
        );
        if (decryptedPass) {
          let token = auth.signToken(userInput);
          if (token) {
            let data = {
              email: dbuser.email,
              token,
            };
            return res.status(200).send({
              status: 200,
              success: true,
              msg: "User logged in successfully!...",
              data,
            });
          }
        } else {
          throw new ErrorHandler(409, "Invalid password");
        }
      } else {
        throw new ErrorHandler(409, "Invalid user");
      }
    } else {
      throw new ErrorHandler(409, "Provide a valid email and password");
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
