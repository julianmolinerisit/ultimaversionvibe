// Order.js (o el nombre de tu archivo de modelo)
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    phoneNumber: {
      type: String, // Add phoneNumber field
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: Date,
      required: true,
    },
    instructions: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
