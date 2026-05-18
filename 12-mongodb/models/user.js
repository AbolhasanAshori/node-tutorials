/**
 * @typedef {import('./product')} Product
 *
 * @typedef CartItem
 * @type {Object}
 * @property {ObjectId} productId
 * @property {number} quantity
 *
 * @typedef Cart
 * @type {Object}
 * @property {CartItem[]} items
 *
 * @typedef UserProps
 * @type {Object}
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {Cart} cart
 */

const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  /** @param {UserProps} props */
  constructor(props) {
    this._id = props.id ? new ObjectId(props.id) : null;
    this.name = props.username;
    this.email = props.email;
    this.cart = props.cart;
  }

  static #getCollection() {
    const db = getDb();
    return db.collection("users");
  }

  /** @param {string} id  */
  static findById(id) {
    return User.#getCollection().findOne({ _id: new ObjectId(id) });
  }

  /** @param {Product} product */
  addToCart(product) {
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.equals(product._id);
    });

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: product._id, quantity: newQuantity });
    }

    /** @type {Cart} */
    const updatedCart = { items: updatedCartItems };
    return User.#getCollection().updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  save() {
    const collection = User.#getCollection();

    return this._id ? collection.updateOne({ _id: this._id }, { $set: this }) : collection.insertOne(this);
  }
}

module.exports = User;
