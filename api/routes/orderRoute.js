const express = require("express");
const { protect } = require("../services/authService");
const {
  createCashOrder,
  getAllOrders,
  getOrder,
  updateOrderToPaid,
  checkoutSession,
  changeOrderStatus,
  deleteOrder,
} = require("../services/orderService");
const router = express.Router();

router.route("/:cartId").post(protect, createCashOrder);
router.route("/").get(protect, getAllOrders);
router.route("/:id").get(protect, getOrder).delete(protect, deleteOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/status").put(protect, changeOrderStatus);
router.route("/checkout-session/:cartId").get(protect, checkoutSession);

module.exports = router;
