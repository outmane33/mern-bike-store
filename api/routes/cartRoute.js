const express = require("express");
const {
  addProductToCart,
  removeProductFromCart,
  getLoggedUserCart,
  clearCart,
  updateCartItemQuantity,
} = require("../services/cartService");
const { protect } = require("../services/authService");
const router = express.Router();

router
  .route("/")
  .get(protect, getLoggedUserCart)
  .post(protect, addProductToCart)
  .delete(protect, clearCart);
router.route("/:id").delete(protect, removeProductFromCart);
router.route("/updateQuantity").post(protect, updateCartItemQuantity);

module.exports = router;
