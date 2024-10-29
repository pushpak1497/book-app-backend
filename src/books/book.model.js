import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "test description" },
    category: {
      type: String,
      required: true,
    },
    trending: { type: Boolean, required: true },
    coverImage: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
