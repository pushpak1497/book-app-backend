import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      country: String,
      state: String,
      zipcode: String,
    },
    phone: { type: Number, required: true },
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    totalPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
