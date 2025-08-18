// models/Offer.js
import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
    text: {
      type: String, // Banner text
      trim: true,
      required: true,
    },
    icon: {
      type: String,
      enum: ["gift", "bolt", "truck"],
      default: "gift",
    },
  },
  {
    timestamps: true, // automatically creates createdAt and updatedAt
  }
);

// Avoid recompiling model if it already exists
export default mongoose.models.Offer || mongoose.model("Offer", OfferSchema);
