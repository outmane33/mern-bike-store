const { default: mongoose } = require("mongoose");

const orderShema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    shippingAdress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    orderStatus: {
      type: String,
      enum: ["Pending", "In Process", "In Shipping", "Delivered", "Rejected"],
      default: "In Process",
    },
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderShema);
module.exports = Order;
