const path = require("node:path");
const express = require("express");
const pathUtil = require("../util/path");

const router = express.Router();

const products = [];

router
  .get("/add-product", (_req, res) => {
    res.sendFile(path.join(pathUtil.rootDir, "views", "add-product.html"));
  })
  .post("/add-product", (req, res) => {
    products.push({ title: req.body.title });
    res.redirect("/");
  });

module.exports = {
  routes: router,
  products,
};
