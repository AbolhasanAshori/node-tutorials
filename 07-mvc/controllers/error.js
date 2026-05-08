function getNotFound(_req, res) {
  res.status(404).render("not-found", { title: "Not Found", path: "*" });
}

module.exports = {
  getNotFound,
};
