import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
});
