const express = require("express");
const path = require("node:path");
const rootDir = require("./util/path");

const router = express.Router();

router.get("/", (_req, res) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
