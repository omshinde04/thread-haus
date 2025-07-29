import mongoose from "mongoose";

const genreProductSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // ✅ updated from Map to array
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  { timestamps: true }
);

export default mongoose.models.GenreProduct || mongoose.model("GenreProduct", genreProductSchema);
