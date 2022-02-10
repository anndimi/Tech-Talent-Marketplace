import { PostSchema } from "./Schemas/post";
import { UserSchema } from "./Schemas/user";
import mongoose from "mongoose";

const Post = mongoose.model("Post", PostSchema);
const User = mongoose.model("User", UserSchema);

export const EditPost = async (req, res) => {
  const updatedPostInfo = req.body;
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updatedPostInfo },
      { new: true }
    );
    if (updatedPost) {
      res.status(200).json({ response: updatedPost, success: true });
    } else {
      res.status(404).json({ response: "Post not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export const GetSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const singlePost = await Post.findById(id).populate("user", {
      username: 1,
      email: 1,
    });
    if (singlePost) {
      res.status(200).json({ response: singlePost, success: true });
    } else {
      res.status(404).json({ response: "Post not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid post ID", success: false });
  }
};

export const DeletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json({ response: deletePost, success: true });
  } catch (error) {
    res.status(400).json({ error: "Post id not found!", success: false });
  }
};

//RegExp to search for queries in frontend
export const GetAllPosts = async (req, res) => {
  const { title, description } = req.query;

  try {
    const allPosts = await Post.find({
      title: new RegExp(title, "i"),
      description: new RegExp(description, "i"),
    })
      .sort({ createdAt: "desc" }) //sorterar
      .populate("user", {
        username: 1,
        email: 1,
      });
    res.status(201).json({ response: allPosts, success: true });
  } catch (error) {
    res.status(400).json({ error: "No posts found!", success: false });
  }
};

export const likedPost = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const updatedLikedPost = await Post.findById(postId);

    if (updatedLikedPost) {
      const likedByUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: { likedPost: updatedLikedPost },
        },
        {
          new: true,
        }
      );
      res.status(201).json({ response: likedByUser, success: true });
    } else {
      res.status(404).json({ response: "No liked post", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export const unlikedPost = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const updatedLikedPost = await Post.findById(postId);

    if (updatedLikedPost) {
      const likedByUser = await User.findByIdAndUpdate(
        userId,
        {
          $pullAll: { likedPost: [updatedLikedPost] },
        },
        {
          new: true,
        }
      );
      res.status(201).json({ response: likedByUser, success: true });
    } else {
      res.status(404).json({ response: "No liked posts", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};
