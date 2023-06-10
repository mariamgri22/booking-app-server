const express = require("express");
const router = express.Router();
const UserServices = require("./UserServices");
const { body, validationResult } = require("express-validator");
const ValidationException = require("../shared/ValidationException");
const {generateAuthToken} = require("../shared/generateAuthToken");
const bcrypt = require("bcrypt");

router.post(
  "/users",
  body("username")
    .notEmpty()
    .withMessage("username_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("username_size"),
  body("email")
    .isEmail()
    .withMessage("email_invalid")
    .bail()
    .custom(async (email) => {
      const user = await UserServices.findByEmail(email);
      if (user) {
        throw new Error("email_inuse");
      }
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    const { user, token } = await UserServices.create(req.body);
    res.send({ user, token, message: "user_create_success" });
  }
);

router.post(
  "/login",
  body("email").isEmail().withMessage("email_invalid"),
  body("password").notEmpty().withMessage("password_null"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const { email, password } = req.body;
    const user = await UserServices.findByEmail(email);

    if (!user) {
      return next(new AuthException("login_failed"));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(new AuthException("login_failed"));
    }
    const token = generateAuthToken(user);

    res.send({ token, message: "login_success" });
  }
);

module.exports = router;
