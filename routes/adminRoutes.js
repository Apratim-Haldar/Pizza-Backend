const express = require("express");
const router = express.Router();
const { addPizza, getPizzas } = require("../controllers/pizzaController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.route("/add-pizzas").post(authMiddleware, adminMiddleware, addPizza);

module.exports = router;