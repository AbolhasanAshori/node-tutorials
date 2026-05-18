const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

/**
 * @typedef ProductProps
 * @type {Object}
 * @property {string} [id]
 * @property {string} title
 * @property {number} price
 * @property {string} imageUrl
 * @property {string} description
 * @property {string} userId
 */

class Product {
  /** @param {ProductProps} props */
  constructor(props) {
    this._id = props.id ? new ObjectId(props.id) : null;
    this.title = props.title;
    this.price = props.price;
    this.imageUrl = props.imageUrl;
    this.description = props.description;
    this.userId = props.userId;
  }

  save() {
    const db = getDb();

    /**
     * @typedef {import("mongodb").Document} Document
     * @typedef {import("mongodb").UpdateResult<Document>} UpdateResult
     * @typedef {import("mongodb").InsertOneResult<Document>} InsertOneResult
     * @type {Promise<UpdateResult | InsertOneResult>}
     */
    let dbPromise;

    if (this._id) {
      dbPromise = db.collection("products").updateOne({ _id: this._id }, { $set: this });
    } else {
      dbPromise = db.collection("products").insertOne(this);
    }

    return dbPromise;
  }

  static fetchAll() {
    const db = getDb();

    return db.collection("products").find().toArray();
  }

  /** @param {string} id  */
  static findById(id) {
    const db = getDb();

    return db
      .collection("products")
      .find({ _id: new ObjectId(id) })
      .next();
  }

  /** @param {string} id  */
  static deleteById(id) {
    const db = getDb();
    return db.collection("products").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;
