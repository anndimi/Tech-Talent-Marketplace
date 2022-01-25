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

// const UserImage = mongoose.model("UserImage", {
//   // name: String,

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

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
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const {
    username,
    password,
    email,
    location,
    name,
    createdAt,
    bio,
    linkedIn,
    github,
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
      createdAt,
      bio,
      linkedIn,
      github,
      // imageUrl: req.file.path,
    }).save();

    res.status(201).json({
      response: {
        id: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
        email: newUser.email,
        location: newUser.location,
        name: newUser.name,
        createdAt: newUser.createdAt,
        bio: newUser.bio,
        linkedIn: newUser.linkedIn,
        github: newUser.github,
        // imageUrl: newUser.imageUrl,
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
});

app.post("/signin", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
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
});

//endpoint prepared to get data that can be displayed for a logged in user
//app.get("/userprofile", authenticateUser);
app.get("/userprofile", authenticateUser, (req, res) => {
  res.json({ message: "This is your profile!" });
});

app.get("/userprofile/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id).populate("UserImage", {
      imageUrl: 1,
    });

    res.status(201).json({ response: singleUser, success: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid user ID", success: false });
  }
});

//Profile image endpoint
// app.post("/userprofile/image", parser.single("image"), async (req, res) => {
//   res.json({ imageUrl: req.file.path, imageId: req.file.filename });
// });

// app.post("/userprofile/image", authenticateUser, async (req, res) => {
//   try {
//     const profileImage = await new UserImage({
//       name: req.body.filename,

//       user: req.user,
//     }).save();
//     res.json(profileImage);
//   } catch (err) {
//     res.status(400).json({ errors: err.errors });
//   }
// });

app.get("/userprofile/test/image", authenticateUser, async (req, res) => {
  try {
    const allImages = await UserImage.find().populate("user", {
      username: 1,
    });
    res.status(201).json({ response: allImages, success: true });
  } catch (error) {
    res.status(400).json({ error: "No img found!", success: false });
  }
});

//Post a new add
// app.post("/adds", authenticateUser);
app.post("/adds", async (req, res) => {
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
    res.status(201).json({ response: newAdd, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//Updates the add info that are edited. Ignores the other key & values with the $set operator
app.patch("/adds/:id/edit", async (req, res) => {
  const updatedAddInfo = req.body;
  const { id } = req.params;
  try {
    const updatedAdd = await Add.findByIdAndUpdate(
      id,
      { $set: updatedAddInfo },
      { new: true }
    );
    if (updatedAdd) {
      res.status(200).json({ response: updatedAdd, success: true });
    } else {
      res.status(404).json({ response: "Add not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//Search single add
app.get("/adds/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleAdd = await Add.findById(id).populate("user", {
      username: 1,
      email: 1,
    });

    res.status(200).json({ response: singleAdd, success: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid add ID", success: false });
  }
});

//Delete single add
app.delete("/adds/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAdd = await Add.findByIdAndDelete(id);
    res.status(201).json({ response: deleteAdd, success: true });
  } catch (error) {
    res.status(400).json({ error: "Add id not found!", success: false });
  }
});

//filter adds based on category
app.get("/adds/categories/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const filteredCategory = await Add.find({ category });
    res.status(200).json({ response: filteredCategory, success: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid category", success: false });
  }
});

// sort based on createedAt
app.get("/adds/created/asc", async (req, res) => {
  const sortedByTime = await Add.find().sort({ createdAt: "asc" });
  try {
    res.status(200).json({ response: sortedByTime, success: true });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Cannot sort by that order", success: false });
  }
});

//sort by join/looking
app.get("/adds/type/:typeOf", async (req, res) => {
  const { typeOf } = req.params;
  try {
    const filteredType = await Add.find({ typeOf });
    res.status(200).json({ response: filteredType, success: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid type", success: false });
  }
});

app.delete("/adds", async (req, res) => {
  const { createdAt } = req.body;

  try {
    const allDeletedAdds = await Add.findOneAndDelete(createdAt);
    // const time = createdAt + 2592000000
    const time = createdAt + 60000;
    if (time < Date.now()) {
      allDeletedAdds;
    }
  } catch (error) {
    res.status(400).json({ error: "Add id not found!", success: false });
  }
});

//Search all adds
app.get("/adds", async (req, res) => {
  try {
    const allAdds = await Add.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: 1,
        email: 1,
      });
    res.status(201).json({ response: allAdds, success: true });
  } catch (error) {
    res.status(400).json({ error: "No adds found!", success: false });
  }
});

//Search single user
app.get("/userprofile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findById(id);
    res.status(201).json({ response: singleUser, success: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid user ID", success: false });
  }
});

//Updates the user info that are edited. Ignores the other key & values with the $set operator
app.patch("/userprofile/:id/edit", parser.single("image"), async (req, res) => {
  const updatedUserInfo = req.body;
  const { id } = req.params;
  console.log(req.b);
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json({ response: updatedUser, success: true });
    } else {
      res.status(404).json({ response: "Member not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
