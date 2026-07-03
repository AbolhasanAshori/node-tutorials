const express = require("express");
const { check, body } = require("express-validator");
const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
} = require("../controllers/auth");
const { User } = require("../models");

const router = express.Router();

function createEmailValidator() {
  return check("email").isEmail().withMessage("Please enter a valid email");
}

const emailValidator = createEmailValidator();

const signupEmailValidator = createEmailValidator().custom((value) => {
  return User.findOne({ email: value }).then((user) => {
    if (user) {
      return Promise.reject("An account with this email already exists. Please log in.");
    }
  });
});

const passwordValidator = body("password", "Please enter a password with only numbers, text and at least 5 characters.")
  .isLength({ min: 5 })
  .isAlphanumeric();

const confirmPasswordValidator = body(
  "confirmPassword",
  "The password and confirm password fields do not match.",
).custom((value, { req }) => value === req.body.password);

router
  .get("/login", getLogin)
  .post("/login", [emailValidator, passwordValidator], postLogin)
  .post("/logout", postLogout)
  .get("/signup", getSignup)
  .post("/signup", [signupEmailValidator, passwordValidator, confirmPasswordValidator], postSignup)
  .get("/reset", getReset)
  .post("/reset", postReset)
  .get("/reset/:token", getNewPassword)
  .post("/new-password", postNewPassword);

module.exports = router;
