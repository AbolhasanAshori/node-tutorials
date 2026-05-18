/**
 * @typedef UserProps
 * @type {Object}
 * @property {string} id
 * @property {string} username
 * @property {string} email
 */

const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  /** @param {UserProps} props */
  constructor(props) {
    this._id = props.id ? new ObjectId(props.id) : null;
    this.name = props.username;
    this.email = props.email;
  }

  static #getCollection() {
    const db = getDb();
    return db.collection("users");
  }

  /** @param {string} id  */
  static findById(id) {
    return User.#getCollection().findOne({ _id: new ObjectId(id) });
  }

  save() {
    const collection = User.#getCollection();

    return this._id ? collection.updateOne({ _id: this._id }, { $set: this }) : collection.insertOne(this);
  }
}

module.exports = User;
