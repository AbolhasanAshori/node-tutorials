const fs = require("node:fs");

const handleRequest = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome</title></head>");
    res.write("<body>");
    res.write("<h1>Welcome</h1>");
    res.write("<h2>Add User</h2>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><button type"submit">Save</button></form>',
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    return fs.readFile("users.txt", { encoding: "utf8" }, (err, data) => {
      const users = data.split("\n");
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Users</title></head>");
      res.write("<body>");
      res.write("<ul>");
      users.forEach((user) => {
        res.write(`<li>${user}</li>`);
      });
      res.write("</ul>");
      res.write("</body>");
      res.write("</html>");
      return res.end();
    });
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const [_name, value] = parsedBody.split("=");
      fs.appendFile("users.txt", "\n" + value, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/users");
        return res.end();
      });
    });
  }
};

module.exports = {
  handler: handleRequest,
};
