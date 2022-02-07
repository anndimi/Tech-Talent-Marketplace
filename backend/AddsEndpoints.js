import { AddSchema } from "./Schemas/add";
import { UserSchema } from "./Schemas/user";

import mongoose from "mongoose";
import moment from "moment";

const Add = mongoose.model("Add", AddSchema);
const User = mongoose.model("User", UserSchema);

export const EditAdd = async (req, res) => {
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
};

export const GetSingleAdd = async (req, res) => {
  const { id } = req.params;

  try {
    const singleAdd = await Add.findById(id).populate("user", {
      username: 1,
      email: 1,
    });
    if (singleAdd) {
      res.status(200).json({ response: singleAdd, success: true });
    } else {
      res.status(404).json({ response: "Add not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid add ID", success: false });
  }
};

export const DeleteAdd = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAdd = await Add.findByIdAndDelete(id);
    res.status(200).json({ response: deleteAdd, success: true });
  } catch (error) {
    res.status(400).json({ error: "Add id not found!", success: false });
  }
};

//RegExp to search for queries in frontend
export const GetAllAdds = async (req, res) => {
  const { title, description } = req.query;
  // const today = new Date();
  // const last30days = new Date(today.setDate(today.getDate() + 1));

  try {
    // let currentDate = moment();
    const allAdds = await Add.find({
      title: new RegExp(title, "i"),
      description: new RegExp(description, "i"),
      // createdAt: createdAt + 30 < today,
      // createdAt: { $gte: today, $lt: last30days },
    })
      // .filter((date) => moment(date).isSame(currentDate, "day"))
      .sort({ createdAt: "desc" }) //sorterar
      .populate("user", {
        username: 1,
        email: 1,
      });
    res.status(201).json({ response: allAdds, success: true });
  } catch (error) {
    res.status(400).json({ error: "No adds found!", success: false });
  }
};

export const likedAdd = async (req, res) => {
  const { addId, userId } = req.params;

  try {
    const updatedLikedAdd = await Add.findById(addId);

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
