const express = require("express");
const path = require("node:path");

const router = express.Router();

router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
