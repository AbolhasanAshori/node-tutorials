const fs = require("node:fs");

const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>',
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const [_name, message] = parsedBody.split("=");
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from node.js server</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = requestHandler;
// exports = requestHandler;

module.exports = {
  handler: requestHandler,
  someText: "This is a hard-coded text",
};

// exports = {
//   handler: requestHandler,
//   someText: "This is a hard-coded text"
// }

// exports.handler = requestHandler;
// exports.someText = "This is a hard-coded text";
