const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded());

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found!</h1>");
});

app.listen(3000);
