import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import listEndpoints from "express-list-endpoints";
import { UserSchema } from "./Schemas/user";
import { AddSchema } from "./Schemas/add";
import { ImageSchema } from "./Schemas/image";
import { SignupUser } from "./SignupEndpoints";
import { SigninUser } from "./SigninEndpoints";
import { PostAdd } from "./PostAddEndpoints";
import { EditAdd, GetSingleAdd, DeleteAdd, GetAllAdds } from "./AddsEndpoints";
import {
  EditUser,
  DeleteUser,
  GetSingleUser,
  GetImage,
  PatchImage,
  PostImage,
} from "./UserEndpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
dotenv.config();

//Image upload storage and set up
const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: "dhmiugr5l",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profileimage",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const parser = multer({ storage });

const Image = mongoose.model("Image", ImageSchema);
const Add = mongoose.model("Add", AddSchema);
const User = mongoose.model("User", UserSchema);

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        response: {
          message: "Please, log in",
        },
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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

//All these keys & values are available but not required when signed in
// REQUIRED: username, password, email
//, parser.single("image") DENNA SKA IN  INNAN ASYNC
app.post("/signup", SignupUser);
app.post("/signin", SigninUser);

//Profile image endpoint
// app.post("/userprofile/image", parser.single("image"), async (req, res) => {
//   res.json({ imageUrl: req.file.path, imageId: req.file.filename });
// });

app.post("/userprofile/:id/image", parser.single("image"), PostImage);

app.patch("/userprofile/:id/image/edit", parser.single("image"), PatchImage);

app.get("/userprofile/:id/image", GetImage);

//Post a new add
// app.post("/adds/:id", authenticateUser);
app.post("/adds/:id", authenticateUser, PostAdd);

app.patch("/adds/:id/edit", EditAdd);

//Search single add
app.get("/adds/:id", GetSingleAdd);

//Delete single add
app.delete("/adds/:id/delete", DeleteAdd);

// app.delete("/adds", async (req, res) => {
//   const { createdAt } = req.body;

//   try {
//     const allDeletedAdds = await Add.findOneAndDelete(createdAt);
//     const time = createdAt + 2592000000
//     const time = createdAt + 60000;
//     if (time < Date.now()) {
//       allDeletedAdds;
//     }
//   } catch (error) {
//     res.status(400).json({ error: "Add id not found!", success: false });
//   }
// });

//Search all adds
app.get("/adds", GetAllAdds);

//Search single user  authenticateUser, SKA IN I , async,
app.get("/userprofile/:id", GetSingleUser);

//Updates the user info that are edited. Ignores the other key & values with the $set operator
//Deletes the user with the id
app.patch("/userprofile/:id/edit", EditUser);
app.delete("/userprofile/:id/delete", DeleteUser);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
