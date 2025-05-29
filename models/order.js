const mongoose = require("mongoose");

// Reference to the Product and Auth models
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  totalAmount: { type: Number, required: true, default: 0 },
  orderStatus: { type: String, required: true, default: "Pending" },
  shippingAddress: {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
    country: { type: String, default: "" }
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order
};
