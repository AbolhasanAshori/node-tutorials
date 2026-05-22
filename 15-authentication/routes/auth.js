const express = require("express");
const { getLogin, postLogin, postLogout } = require("../controllers/auth");

const router = express.Router();

router.get("/login", getLogin).post("/login", postLogin).post("/logout", postLogout);

module.exports = router;
