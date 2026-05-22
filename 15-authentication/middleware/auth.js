const { User } = require("../models");

/** @type {import('./index').ExpressMiddleware} */
function authenticateUser(req, res, next) {
  if (!req.session.userId) return next();

  User.findById(req.session.userId)
    .then((user) => {
      if (user) {
        req.user = user;
      } else {
        req.session.destroy((err) => {
          if (err) console.error("Session destroy error after user not found:", err);
          res.redirect("/login");
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching user in auth middleware:", error);
      return res.status(500).send("Authentication error");
    })
    .finally(() => {
      next();
    });
}

module.exports = {
  authenticateUser,
};
