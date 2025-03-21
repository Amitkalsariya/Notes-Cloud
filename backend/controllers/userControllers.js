const USER = require("../models/userModel");
const asynchandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const newUser = asynchandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const existedUser = await USER.findOne({ email });
  if (existedUser) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await USER.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error In  newUser Controllers");
  }
});
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });
  if (user && (await user.matchPassword(password)))
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asynchandler(async (req, res) => {
  const user = await USER.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  }

  else
  {
    res.status(404)
    throw new Error("User Not  Found")
  }
});
module.exports = { newUser, loginUser, updateUserProfile };
