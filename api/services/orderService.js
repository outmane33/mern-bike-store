const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const ApiFeature = require("../utils/apiFeature");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51QAXf7Cxg0ISglo7PHHlklBSdaawry7OXj3QKaTwrlnfGgQSNMWoUnUUeqrZSyZUonaAbhi5rbIRObrXAVtpBTjf00WIzlkb8z"
);

exports.createCashOrder = expressAsyncHandler(async (req, res, next) => {
  //app setting
  const taxtPrice = 0;
  const shippingPrice = 0;

  // 1. Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`there is no cart for this user id: ${req.user._id}`, 404)
    );
  }

  // 2. Get Order Price depend on cart price "check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxtPrice + shippingPrice;

  // 3. create order with default payment method "cash"
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAdress: req.body.shippingAdress,
    totalOrderPrice,
  });
  // 4. after creating order, decriment product quantity, increment product sold
  if (order) {
    const bulkOptions = cart.cartItems.map((e) => ({
      updateOne: {
        filter: { _id: e.product },
        update: { $inc: { quantity: -e.quantity, sold: +e.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOptions);
  }
  // 5. clear cart depend on cartId
  await cart.deleteOne({ _id: req.params.cartId });

  res.status(201).json({
    status: "success",
    order: order,
  });
});

exports.getAllOrders = expressAsyncHandler(async (req, res, next) => {
  const count = await Order.countDocuments();
  const apiFeature = new ApiFeature(
    Order.find()
      .populate("user", "userName -_id")
      .populate("cartItems.product"),
    req.query
  )
    .pagination(count)
    .filter()
    .sort()
    .fields()
    .search();
  const { mongooseQuery, paginationResult } = apiFeature;

  const orders = await mongooseQuery;
  res.status(200).json({
    status: "success",
    paginationResult,
    orders,
  });
});

exports.changeOrderStatus = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus: req.body.orderStatus,
      isPaid: req.body.orderPayment,
    },
    {
      new: true,
    }
  ).populate("user", "userName -_id");
  //populate user

  if (!order) {
    return next(
      new ApiError(`there is no order for this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    order,
  });
});

exports.getOrder = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "cartItems.product"
  );
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  res.status(200).json({
    status: "success",
    order,
  });
});

exports.deleteOrder = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  res.status(200).json({
    status: "success",
  });
});

exports.updateOrderToPaid = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(`there is no order for this id: ${req.params.id}`, 404)
    );
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  const updatedOrder = await order.save();

  res.status(200).json({
    status: "success",
    data: updatedOrder,
  });
});

exports.checkoutSession = expressAsyncHandler(async (req, res, next) => {
  console.log("hello");
  // app setting
  const taxtPrice = 0;
  const shippingPrice = 0;

  // 1. Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`there is no cart for this user id: ${req.user._id}`, 404)
    );
  }

  // 2. Get Order Price depend on cart price "check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxtPrice + shippingPrice;
  // 3) Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          // currency: "egp",
          currency: "mad",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.userName,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // success_url: `${req.protocol}://${req.get("host")}/orders`,
    // cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    success_url: `${process.env.FRONTEND_URL}/order/${uuidv4()}`,
    cancel_url: `https://www.arabic-keyboard.org/`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  // 4) send session to response
  res.status(200).json({ status: "success", session });
});
