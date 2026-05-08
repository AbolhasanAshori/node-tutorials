const path = require("node:path");
const express = require("express");
const pathUtil = require("../util/path");

const router = express.Router();

router
  .get("/add-product", (_req, res) => {
    res.sendFile(path.join(pathUtil.rootDir, "views", "add-product.html"));
  })
  .post("/add-product", (req, res) => {
    console.log(req.body);
    res.redirect("/");
  });

module.exports = router;
