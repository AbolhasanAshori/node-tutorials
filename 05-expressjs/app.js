const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("node:path");
const pathUtil = require("./util/path");

const app = express();

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((_req, res) => {
  res.status(404).sendFile(path.join(pathUtil.rootDir, "views", "not-found.html"));
});

app.listen(3000);
