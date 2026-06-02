const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

/** @type {import('./user').IUser['addToCart']} */
userSchema.methods.addToCart = function (product) {
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
  this.cart = updatedCart;
  return this.save();
};

/** @type {import('./user').IUser['deleteCartItem']} */
userSchema.methods.deleteCartItem = function (id) {
  const updatedCartItems = this.cart.items.filter((item) => !item.productId.equals(id));

  this.cart.items = updatedCartItems;
  return this.save();
};

/** @type {import('./user').IUser['clearCart']} */
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = model("User", userSchema);
