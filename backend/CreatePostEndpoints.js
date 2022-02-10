import { UserSchema } from "./Schemas/user";
import { PostSchema } from "./Schemas/post";
import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

export const CreatePost = async (req, res) => {
  const { id } = req.params;
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
    const newPost = await new Post({
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
      $push: { post: newPost },
    });
    res.status(201).json({ response: newPost, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};
