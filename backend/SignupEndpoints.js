import bcrypt from "bcrypt";
import { UserSchema } from "./Schemas/user";
import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema);

export const SignupUser = async (req, res) => {
  const {
    username,
    password,
    email,
    location,
    name,
    bio,
    linkedIn,
    github,
    created,
    likedPost,
  } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw { message: "Password must be at least 5 characters long" };
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
      location,
      name,
      bio,
      linkedIn,
      github,
      created,
      likedPost,
    }).save();

    res.status(201).json({
      response: {
        id: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
        email: newUser.email,
        location: newUser.location,
        name: newUser.name,
        bio: newUser.bio,
        linkedIn: newUser.linkedIn,
        github: newUser.github,
        created: newUser.created,
        likedPost: newUser.likedPost,
      },
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        response: "Username already exists, please choose another username!",
        error: error,
        success: false,
      });
    } else {
      res.status(400).json({
        response: "Something went wrong",
        error: error,
        success: false,
      });
    }
  }
};
