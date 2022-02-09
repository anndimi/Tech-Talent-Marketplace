import { UserSchema } from "./Schemas/user";
import { AddSchema } from "./Schemas/add";
import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema);
const Add = mongoose.model("Add", AddSchema);

export const PostAdd = async (req, res) => {
  const { id } = req.params;
  console.log(req.user);
  console.log(req.user._id);
  const {
    title,
    description,
    budget,
    currency,
    category,
    time,
    createdAt,
    typeOf,
  } = req.body;
  try {
    const newAdd = await new Add({
      title,
      description,
      budget,
      currency,
      category,
      time,
      createdAt,
      typeOf,
      user: req.user,
    }).save();
    const updatedUser = await User.findByIdAndUpdate(id, {
      $push: { add: newAdd },
    });
    res.status(201).json({ response: newAdd, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};
