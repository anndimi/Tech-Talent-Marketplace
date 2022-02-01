import { UserSchema } from "./Schemas/user";
import { ImageSchema } from "./Schemas/image";
import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema);
const Image = mongoose.model("Image", ImageSchema);

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

// export const PatchImage = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const queriedUser = await User.findById(id);
//     if (queriedUser) {
//       const queriedImage = await Image.findById(imageId);
//       if (queriedImage) {
//         const updatedUser = await User.findByIdAndUpdate(
//           id,
//           {
//             $push: { image: queriedImage },
//           },
//           { new: true }
//         );
//         res.status(200).json({ response: updatedUser, success: true });
//       } else {
//         res.status(404).json({ response: "Image not found", success: false });
//       }
//     } else {
//       res.status(404).json({ response: "User not found", success: false });
//     }
//   } catch (error) {
//     res.status(400).json({ response: error, success: false });
//   }
// };

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
