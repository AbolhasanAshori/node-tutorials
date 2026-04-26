const fs = require("node:fs");
const express = require("express");

express()
  .use("/users", (_req, res, _next) => {
    console.log("Reading User List...");
    fs.readFile("users.txt", (_err, data) => {
      res.send(data);
    });
  })
  .use("/", (_req, res, next) => {
    console.log("A middleware.");
    res.send("Hello");
  })
  .listen(3000);
