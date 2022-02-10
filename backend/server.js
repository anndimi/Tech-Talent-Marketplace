import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import listEndpoints from "express-list-endpoints";
import { UserSchema } from "./Schemas/user";
import { SignupUser } from "./SignupEndpoints";
import { SigninUser } from "./SigninEndpoints";
import { CreatePost } from "./CreatePostEndpoints";
import {
  EditPost,
  GetSinglePost,
  DeletePost,
  GetAllPosts,
  likedPost,
  unlikedPost,
} from "./PostsEndpoints";
import {
  EditUser,
  DeleteUser,
  GetSingleUser,
  GetImage,
  PostImage,
} from "./UserEndpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

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

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.post("/signup", SignupUser);
app.post("/signin", SigninUser);

app.post("/userprofile/:id/image", parser.single("image"), PostImage);
app.get("/userprofile/:id/image", GetImage);
app.get("/userprofile/:id", GetSingleUser);
app.patch("/userprofile/:id/edit", EditUser);
app.delete("/userprofile/:id/delete", DeleteUser);

app.post("/posts/:id", authenticateUser, CreatePost);
app.patch("/posts/:id/edit", EditPost);
app.get("/posts/:id", GetSinglePost);
app.delete("/posts/:id/delete", DeletePost);
app.get("/posts", GetAllPosts);
app.post("/posts/:postId/like/:userId", likedPost);
app.post("/posts/:postId/unlike/:userId", unlikedPost);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
