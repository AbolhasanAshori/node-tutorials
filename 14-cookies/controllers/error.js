function getNotFound(req, res) {
  res.status(404).render("not-found", { title: "Not Found", isAuthenticated: req.cookies.loggedIn === "true" });
}

module.exports = {
  getNotFound,
};
