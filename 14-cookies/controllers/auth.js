function getLogin(req, res) {
  res.render("auth/login", {
    title: "Login",
    isAuthenticated: req.cookies.loggedIn === "true",
    config: {
      activePath: { login: true },
      css: { forms: true, auth: true },
    },
  });
}

function postLogin(req, res) {
  req.session.isLoggedIn = true;
  res.redirect("/");
}

module.exports = {
  getLogin,
  postLogin,
};
