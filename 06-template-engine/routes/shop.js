const path = require("node:path");
const express = require("express");
const pathUtil = require("../util/path");

const router = express.Router();

router.get("/", (_req, res) => {
  res.sendFile(path.join(pathUtil.rootDir, "views", "shop.html"));
});

module.exports = router;
