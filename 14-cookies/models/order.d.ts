import type { Document, ObjectId } from "mongoose";
import type { IProduct } from "./product";

export interface IOrder extends Document {
  products: [
    {
      product: IProduct;
      quantity: number;
    },
  ];
  user: {
    name: string;
    userId: ObjectId;
  };
}

export default IProduct;
