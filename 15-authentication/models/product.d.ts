import type { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: ObjectId;
}

export default IProduct;
