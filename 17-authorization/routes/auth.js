const express = require("express");
const { getLogin, postLogin, postLogout, getSignup, postSignup, getReset, postReset } = require("../controllers/auth");

const router = express.Router();

router
  .get("/login", getLogin)
  .post("/login", postLogin)
  .post("/logout", postLogout)
  .get("/signup", getSignup)
  .post("/signup", postSignup)
  .get("/reset", getReset)
  .post("/reset", postReset);

module.exports = router;
