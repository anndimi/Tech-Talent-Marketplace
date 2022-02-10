import bcrypt from "bcrypt";
import { UserSchema } from "./Schemas/user";
import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema);

export const SigninUser = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      location,
      bio,
      github,
      linkedIn,
      name,
      image,
    } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
          location: user.location,
          bio: user.bio,
          github: user.github,
          linkedIn: user.linkedIn,
          name: user.name,
          created: user.created,
          image: user.imageUrl,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password is incorrect! Try again!",
        error: error,
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: "Oh no, something went wrong!",
      error: error,
      success: false,
    });
  }
};
