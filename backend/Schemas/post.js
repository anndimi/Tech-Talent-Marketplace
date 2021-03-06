import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    minlength: 30,
    maxlength: 1200,
    trim: true,
  },
  budget: {
    type: Number,
  },
  currency: {
    type: String,
    enum: ["SEK", "EUR", "USD", "NOK", "GBP", "DKK", "CNY"],
  },
  category: {
    type: String,
    enum: [
      "Frontend",
      "Backend",
      "Graphics and Design",
      "Fullstack",
      "App Developer",
      "Chatbots",
      "Project Lead",
      "QA",
      "Legal Consulting",
      "Financial Consulting",
      "Analytics",
      "Game Developer",
    ],
  },
  time: {
    type: Date,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
  typeOf: {
    type: String,
    enum: ["Looking for", "Join as"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
