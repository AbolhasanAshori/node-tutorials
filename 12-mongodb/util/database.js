const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

function mongoConnect(callback) {
  new MongoClient(uri)
    .connect()
    .then((client) => {
      console.log("Successfully connected to MongoDB!");
      callback(client);
    })
    .catch((err) => console.error(err));
}

module.exports = mongoConnect;
