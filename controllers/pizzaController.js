const Pizza = require("../models/pizza");

const addPizza = async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    res.status(201).json(pizza);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    addPizza,
    getPizzas
  };