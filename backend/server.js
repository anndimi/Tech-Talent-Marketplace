import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//to validate the email when signing up/in
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  location: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
    minlength: 2,
  },
  memberSince: {
    // type: Date,
    // default: () => new Date(),
    type: Number,
    default: () => Date.now(),
  },
  bio: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 250,
  },
  linkedIn: {
    type: String,
  },
  github: {
    type: String,
  },
  // myAdds: {
  //   type: mongoose.Schema.Types.ObjectID,
  //   ref: "Add",
  // },
  // techStack: {

  // }
  // profileImage: {
  //   data: Buffer,
  //   contentType: String,
  // },

  // addsCreated: [{ type: Schema.Types.ObjectId, ref: "Add" }],
});

const User = mongoose.model("User", UserSchema);

//To create an add.
const AddSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    minlength: 30,
    maxlength: 400,
    trim: true,
  },
  budget: {
    type: Number,
  },
  currency: {
    type: String,
    enum: ["SEK", "EUR", "USD", "NOK", "GBP", "DKK", "CNY"],
  },
  category: {
    type: String,
    enum: [
      "Frontend",
      "Backend",
      "Graphics and Design",
      "Fullstack",
      "App Developer",
      "Chatbots",
      "Project Lead",
      "QA",
      "Legal Consulting",
      "Financial Consulting",
      "Analytics",
      "Game Developer",
    ],
  },
  time: {
    type: Date,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
  typeOf: {
    type: String,
    enum: ["Looking for", "Join"],
  },
});

const Add = mongoose.model("Add", AddSchema);

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });

    if (user) {
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
  res.send("Hello world");
});

//All these keys & values are available but not required when signed in
// REQUIRED: username, password, email
app.post("/signup", async (req, res) => {
  const {
    username,
    password,
    email,
    location,
    name,
    memberSince,
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
      memberSince,
      bio,
      linkedIn,
      github,
    }).save();

    res.status(201).json({
      response: {
        id: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
        email: newUser.email,
        location: newUser.location,
        name: newUser.name,
        memberSince: newUser.memberSince,
        bio: newUser.bio,
        linkedIn: newUser.linkedIn,
        github: newUser.github,
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
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
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
app.get("/userprofile", authenticateUser);
app.get("/userprofile", (req, res) => {
  res.json({ message: "This is your profile!" });
});

//Post a new add
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
    const singleAdd = await Add.findById(id);
    res.status(201).json({ response: singleAdd, success: true });
  } catch (error) {
    res.status(400).json({ error: "Invalid add ID", success: false });
  }
});

//Search all adds
app.get("/adds", async (req, res) => {
  try {
    const allAdds = await Add.find().sort({ createdAt: "desc" });
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
app.patch("/userprofile/:id/edit", async (req, res) => {
  const updatedUserInfo = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedUserInfo },
      { new: true }
    );
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
