const express = require("express");
const path = require("node:path");

express()
  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, "public")))
  .get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  })
  .get("/user", (_req, res) => {
    res.sendFile(path.join(__dirname, "views", "user.html"));
  })
  .listen(3000);
