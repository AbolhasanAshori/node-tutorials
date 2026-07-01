require("dotenv").config();

const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const { getNotFound } = require("./controllers/error");
const { adminRoutes, shopRoutes, authRoutes } = require("./routes");
const { authenticateUser, populateLocals } = require("./middleware/auth");
const { createDbConnectionUri } = require("./util/database");
const csrf = require("csurf");
const flash = require("connect-flash");

const DB_NAME = process.env.DB_NAME ?? "test";

const MONGODB_URI = createDbConnectionUri({
  hostname: process.env.DB_HOST ?? "127.0.0.1",
  port: process.env.DB_PORT ?? 27017,
  dbName: DB_NAME,
  dbType: process.env.DB_TYPE ?? "mongodb",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const viewEngine = engine({
  layoutsDir: "views/layouts",
  partialsDir: "views/partials",
  defaultLayout: "main-layout",
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});
const sessionHandler = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    collectionName: "sessions",
    ttl: 1000 * 60 * 60 * 24 * 14,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
});
const csrfProtection = csrf();

const app = express().engine("hbs", viewEngine).set("view engine", "hbs").set("views", "views");

app
  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, "public")))
  .use(cookieParser())
  .use(sessionHandler)
  .use(flash())
  .use(csrfProtection)
  .use(authenticateUser)
  .use(populateLocals);

app.use("/admin", adminRoutes).use(shopRoutes).use(authRoutes).use(getNotFound);

mongoose
  .connect(MONGODB_URI, {
    authSource: DB_NAME
  })
  .then(() => {
    console.log("Successfully connected to MongoDB using Mongoose!");

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch(console.error);
