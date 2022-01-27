// import { ImageSchema } from "./Schemas/image";
// import multer from "multer";
// import cloudinaryFramework from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { UserSchema } from "./Schemas/user";

// const Image = mongoose.model("Image", ImageSchema);
// const User = mongoose.model("User", UserSchema);
// const parser = multer({ storage });

// const cloudinary = cloudinaryFramework.v2;
// cloudinary.config({
//   cloud_name: "dhmiugr5l",
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "profileimage",
//     allowedFormats: ["jpg", "png", "jpeg", "gif"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//   },
// });

// export const PostImage = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userImage = await new Image({
//       imageUrl: req.file.path,
//     }).save();
//     res.status(200).json({ response: userImage, success: true });
//   } catch (error) {
//     res.status(400).json({ error: error, succcess: false });
//   }
// };

// // export const PatchImage = async (req, res) => {
// //   const { id, imageId } = req.params;

// //   try {
// //     const queriedUser = await User.findById(id);
// //     if (queriedUser) {
// //       const queriedImage = await Image.findById(imageId);
// //       if (queriedImage) {
// //         const updatedUser = await User.findByIdAndUpdate(
// //           id,
// //           {
// //             $set: { image: queriedImage },
// //           },
// //           { new: true }
// //         );
// //         res.status(200).json({ response: updatedUser, success: true });
// //       } else {
// //         res.status(404).json({ response: "Image not found", success: false });
// //       }
// //     } else {
// //       res.status(404).json({ response: "User not found", success: false });
// //     }
// //   } catch (error) {
// //     res.status(400).json({ response: error, success: false });
// //   }
// // };

// export const GetImage = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const queriedUser = await User.findById(id).populate("image");
//     if (queriedUser) {
//       res.status(200).json({ response: queriedUser, success: true });
//     } else {
//       res.status(404).json({ response: "User not found", success: false });
//     }
//   } catch (error) {
//     res.status(400).json({ response: error, success: false });
//   }
// };
