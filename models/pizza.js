const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  toppings: [String], // Optional toppings
  crust: {
    type: String,
    enum: ['thin', 'thick', 'stuffed', 'gluten-free'],
    default: 'thin',
  },
  imageUrl: {
    type: String, // URL for the pizza image
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;
