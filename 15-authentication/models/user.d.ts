import type { Document, ObjectId } from "mongoose";
import type { IProduct } from "./product";

export interface IUser extends Document {
  name: string;
  email: string;
  cart: {
    items: [
      {
        productId: ObjectId;
        quantity: number;
      },
    ];
  };

  deleteCartItem(this: IUser, id: string): Promise<void>;
  addToCart(this: IUser, product: IProduct): Promise<void>;
  clearCart(this: IUser): Promise<void>;
}

export default IUser;
