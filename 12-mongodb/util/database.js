const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
/** @type {import('mongodb').Db} */
let _db;

function mongoConnect(callback) {
  new MongoClient(uri)
    .connect()
    .then((client) => {
      console.log("Successfully connected to MongoDB!");
      _db = client.db(process.env.DB_NAME);
      callback(client);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function getDb() {
  if (_db) return _db;

  throw "No database found!";
}

module.exports = {
  mongoConnect,
  getDb,
};
