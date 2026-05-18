require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { getNotFound } = require("./controllers/error");
const { adminRoutes, shopRoutes } = require("./routes");
const { mongoConnect } = require("./util/database");
const User = require("./models/user");
const { ObjectId } = require("mongodb");

const app = express();
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    defaultLayout: "main-layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, _res, next) => {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.user = new User({
        ...user,
        username: user.name,
        id: user._id.toString(),
      });
      next();
    })
    .catch(console.error);
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getNotFound);

mongoConnect((_client, db) => {
  const users = db.collection("users");

  users
    .findOne({ _id: new ObjectId("5baa2528563f16379fc8a610") }, { projection: { _id: 1 } })
    .then((user) => {
      if (user) return;
      return users.insertOne(
        new User({
          id: "5baa2528563f16379fc8a610",
          email: "test@example.com",
          username: "test",
          cart: {
            items: [],
          },
        }),
      );
    })
    .then(() => {
      app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
      });
    })
    .catch(console.error);
});
