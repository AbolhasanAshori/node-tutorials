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

  /** @param {string} name */
  static #getCollection(name = "users") {
    const db = getDb();
    return db.collection(name);
  }

  /** @param {string} id  */
  static findById(id) {
    return User.#getCollection().findOne({ _id: new ObjectId(id) });
  }

  getCart() {
    const ids = this.cart.items.map((item) => item.productId);

    return User.#getCollection("products")
      .find({ _id: { $in: ids } })
      .toArray()
      .then((products) =>
        products.map((product) => ({
          ...product,
          quantity: this.cart.items.find((item) => item.productId.equals(product._id)).quantity,
        })),
      );
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

  /** @param {string} id  */
  deleteCartItem(id) {
    const updatedCartItems = this.cart.items.filter((item) => !item.productId.equals(id));

    return User.#getCollection().updateOne({ _id: this._id }, { $set: { cart: { items: updatedCartItems } } });
  }

  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
            name: this.name,
            email: this.email,
          },
        };
        return User.#getCollection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { item: [] };
        return User.#getCollection().updateOne({ _id: this._id }, { $set: { cart: this.cart } });
      });
  }

  save() {
    const collection = User.#getCollection();

    return this._id ? collection.updateOne({ _id: this._id }, { $set: this }) : collection.insertOne(this);
  }
}

module.exports = User;
