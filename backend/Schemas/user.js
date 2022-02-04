import mongoose from "mongoose";
import crypto from "crypto";

//to validate the email when signing up/in
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  location: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
    minlength: 2,
  },
  bio: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 250,
  },
  linkedIn: {
    type: String,
  },
  github: {
    type: String,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  created: {
    type: Number,
    default: () => Date.now(),
    timestamps: true,
  },
  likedAdd: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Add",
    },
  ],
  add: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Add",
    },
  ],
});
