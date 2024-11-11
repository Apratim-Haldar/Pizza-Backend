const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  addresses: [
    {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'IN',
      },
      isDefault: {
        type: Boolean,
        default: false,  // Indicates the default address for orders
      },
    }
  ],
  favoritePizzas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pizza',  // References favorite pizzas
    }
  ],
  orderHistory: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',  // References the Order model
      },
      date: {
        type: Date,
        default: Date.now,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    }
  ],
  cart: [
    {
      pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',  // References Pizza model for each cart item
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    }
  ],
  paymentDetails: {
    cardNumber: {
      type: String,
    },
    cardExpiry: {
      type: String,
    },
    cardCVV: {
      type: String,
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'IN',
      },
    }
  },
  preferences: {
    preferredCrust: {
      type: String,
      enum: ['thin', 'thick', 'stuffed', 'gluten-free'],
      default: 'thin',
    },
    preferredToppings: [String],  // Stores user’s preferred toppings
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

// Indexes for optimizing queries on username and email
userSchema.index({ username: 1, email: 1 });

const User = mongoose.model('User', userSchema, "USERS");
module.exports = User;
