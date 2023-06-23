// Assuming you have already set up the MongoDB connection using Mongoose

// Import the necessary modules
const mongoose = require("mongoose");

// Define the schema for the "purchased_tokens" collection
const tokenSchema = new mongoose.Schema({
  meterNumber: { type: String, required: true },
  token: { type: String, required: true },
  tokenStatus: {
    type: String,
    enum: ["USED", "NEW", "EXPIRED"],
    required: true,
  },
  tokenValueDays: { type: Number, required: true },
  purchasedDate: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
});

// Create a model for the "purchased_tokens" collection
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
