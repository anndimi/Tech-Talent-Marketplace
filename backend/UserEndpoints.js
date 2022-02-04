import { UserSchema } from "./Schemas/user";
import { ImageSchema } from "./Schemas/image";
import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema);
const Image = mongoose.model("Image", ImageSchema);
// const Add = mongoose.model("Add", AddSchema);

export const GetSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const queriedUser = await User.findById(id)
      .populate("add")
      .populate("image");
    if (queriedUser) {
      res.status(201).json({ response: queriedUser, success: true });
    } else {
      res.status(404).json({ response: "User not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};

export const EditUser = async (req, res) => {
  const updatedUserInfo = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedUserInfo },
      {
        new: true,
      }
    );
    if (updatedUser) {
      res.status(200).json({
        response: updatedUser,
        success: true,
      });
    } else {
      res.status(404).json({ response: "Member not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({ response: deleteUser, success: true });
  } catch (error) {
    res.status(400).json({ error: "User id not found!", success: false });
  }
};

// export const PostImage = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userImage = await new Image({
//       imageUrl: req.file.path,
//     }).save();
//     const updatedUser = await User.findByIdAndUpdate(id, {
//       $push: { image: userImage },
//     });
//     res.status(200).json({ response: userImage, success: true });
//   } catch (error) {
//     res.status(400).json({ error: error, succcess: false });
//   }
// };

export const PostImage = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedImage = await new Image({
      imageUrl: req.file.path,
    }).save();

    if (updatedImage) {
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: { image: updatedImage },
      });
      res.status(200).json({
        response: updatedImage,
        success: true,
      });
    } else {
      res.status(404).json({ response: "Image not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export const GetImage = async (req, res) => {
  const { id } = req.params;

  try {
    const queriedUser = await User.findById(id).populate("image");
    if (queriedUser) {
      res.status(200).json({ response: queriedUser.image, success: true });
    } else {
      res.status(404).json({ response: "User not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export const likedAdd = async (req, res) => {
  const { addId, userId } = req.params;
  console.log(addId, userId, "first");
  try {
    console.log(addId, userId, "second");
    const updatedLikedAdd = await Add.findById(addId, {
      add,
    }).save();
    console.log(updatedLikedAdd, "third");
    if (updatedLikedAdd) {
      const likedByUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: { likedAdd: updatedLikedAdd },
        },
        {
          new: true,
        }
      );
      res.status(201).json({ response: likedByUser, success: true });
    } else {
      res.status(404).json({ response: "No liked adds", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};
