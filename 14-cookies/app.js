require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { getNotFound } = require("./controllers/error");
const { adminRoutes, shopRoutes, authRoutes } = require("./routes");
const { default: mongoose, Types } = require("mongoose");
const { createDbConnectionUri } = require("./util/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use((req, _res, next) => {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(console.error);
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(getNotFound);

mongoose
  .connect(
    createDbConnectionUri({
      hostname: process.env.DB_HOST ?? "127.0.0.1",
      port: process.env.DB_PORT ?? 27017,
      dbName: process.env.DB_NAME ?? "test",
      dbType: process.env.DB_TYPE ?? "mongodb",
    }),
  )
  .then(() => {
    console.log("Successfully connected to MongoDB using Mongoose!");

    return User.updateOne(
      { _id: new Types.ObjectId("5baa2528563f16379fc8a610") },
      { $setOnInsert: { name: "test", email: "test@email.com" } },
      { upsert: true },
    );
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch(console.error);
