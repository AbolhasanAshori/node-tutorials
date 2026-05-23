import type { Document, Model, ObjectId } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: ObjectId;
}

declare const Product: Model<IProduct>;
export = Product;
