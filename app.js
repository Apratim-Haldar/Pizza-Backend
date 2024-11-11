const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db'); // Adjust the path as necessary

const app = express();

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes")); // Adjust the path as necessary
app.use("/api/admin", require("./routes/adminRoutes")); // Add the admin routes
app.use("/api/orders", require("./routes/orderRoutes")); // Add the order routes

app.get("/api", (req, res) => {
  res.send("Welcome to the Pizza Backend");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});