const express = require("express");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (_req, res) => {
  const { products } = adminData;
  res.render("shop", {
    title: "Shop",
    products,
  });
});

module.exports = router;
