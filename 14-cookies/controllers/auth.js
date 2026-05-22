const { User } = require("../models");

/** @type {import('../middleware').ExpressMiddleware} */
function getLogin(req, res) {
  res.render("auth/login", {
    title: "Login",
    isAuthenticated: req.session.isLoggedIn,
    config: {
      activePath: { login: true },
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postLogin(req, res) {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.userId = user.id;
      res.redirect("/");
    })
    .catch(console.error);
}

module.exports = {
  getLogin,
  postLogin,
};
