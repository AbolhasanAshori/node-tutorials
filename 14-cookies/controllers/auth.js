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

function postLogin(_req, res) {
  res.cookie("loggedIn", "true");
  res.redirect("/");
}

module.exports = {
  getLogin,
  postLogin,
};
