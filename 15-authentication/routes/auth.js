const express = require("express");
const { getLogin, postLogin, postLogout, getSignup, postSignup } = require("../controllers/auth");

const router = express.Router();

router
  .get("/login", getLogin)
  .post("/login", postLogin)
  .post("/logout", postLogout)
  .get("/signup", getSignup)
  .post("/signup", postSignup);

module.exports = router;
