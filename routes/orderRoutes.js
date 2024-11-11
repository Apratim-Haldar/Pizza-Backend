const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addToCart,
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/cart").post(authMiddleware, addToCart);
router.route("/create").post(authMiddleware, createOrder);
router.route("/get-orders").get(authMiddleware, getOrders);
router.route("/update").put(authMiddleware, updateOrder);
router.route("/delete").delete(authMiddleware, deleteOrder);

module.exports = router;