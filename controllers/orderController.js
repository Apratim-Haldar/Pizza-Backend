const Order = require("../models/order");
const User = require("../models/user");

const addToCart = async (req, res) => {
  try {
    const { pizzaId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    const cartItem = user.cart.find(item => item.pizzaId.toString() === pizzaId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ pizzaId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.pizzaId');
    const orderItems = user.cart.map(item => ({
      pizza: item.pizzaId._id,
      quantity: item.quantity,
      price: item.pizzaId.price,
    }));

    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const order = new Order({
      user: user._id,
      orderItems,
      totalPrice,
      deliveryAddress: req.body.deliveryAddress,
      paymentDetails: req.body.paymentDetails,
    });

    await order.save();
    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.pizza');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId, orderItems } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderItems = orderItems;
    order.totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};