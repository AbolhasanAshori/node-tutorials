import type { Document, Model, ObjectId } from "mongoose";
import type { IProduct } from "./product";

export interface IUser extends Document {
  email: string;
  password: string;
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

declare const User: Model<IUser>;
export = User;
