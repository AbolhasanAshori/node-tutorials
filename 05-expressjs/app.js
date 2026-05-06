const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("node:path");
const rootDir = require("./util/path");

const app = express();

app.use(bodyParser.urlencoded());

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((_req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "not-found.html"));
});

app.listen(3000);
