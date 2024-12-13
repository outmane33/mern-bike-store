const express = require("express");

const { protect } = require("../services/authService");
const {
  addToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} = require("../services/wishlistService");
const router = express.Router();

router
  .route("/")
  .post(protect, addToWishlist)
  .get(protect, getLoggedUserWishlist);

router.route("/:id").delete(protect, removeProductFromWishlist);

module.exports = router;
