const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const totalCartPrice = async (cart) => {
  let total = 0;
  cart.cartItems.forEach((item) => {
    total += item.quantity * item.price;
  });
  cart.totalCartPrice = total;
  await cart.save();
};

exports.addProductToCart = expressAsyncHandler(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  // Get product
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "cartItems.product"
  );

  if (!cart) {
    // Create cart first
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          price: product.price,
          quantity: quantity,
        },
      ],
    });
    // Then populate it
    cart = await cart.populate("cartItems.product");
  } else {
    // If cart exists
    // Check if product already exists in cart
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product._id.toString() === productId.toString()
    );

    if (productIndex > -1) {
      // If product exists, increment quantity
      cart.cartItems[productIndex].quantity += quantity;
    } else {
      // If product not exists, push it to cart
      cart.cartItems.push({
        product: productId,
        price: product.price,
        quantity: quantity,
      });
    }
  }

  // Calculate total price
  cart.totalCartPrice = cart.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  await cart.save();

  // Populate the cart again after saving to ensure we have all product details
  cart = await cart.populate("cartItems.product");

  res.status(201).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    cart,
  });
});
exports.removeProductFromCart = expressAsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.id } },
    },
    {
      new: true,
    }
  ).populate("cartItems.product");

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  totalCartPrice(cart);

  res.status(200).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    cart,
  });
});

exports.getLoggedUserCart = expressAsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "cartItems.product"
  );
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    cart,
  });
});

exports.clearCart = expressAsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({
    status: "success",
    cart,
  });
});

exports.updateCartItemQuantity = expressAsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "cartItems.product"
  );
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  const { productId } = req.body;

  const itemIndex = cart.cartItems.findIndex((item) => {
    return item._id.toString() === productId;
  });
  if (itemIndex > -1) {
    cart.cartItems[itemIndex].quantity = req.body.quantity;
  }
  totalCartPrice(cart);
  res.status(200).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    cart,
  });
});
