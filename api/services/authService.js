const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utils/generateToken");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

exports.signUp = expressAsyncHandler(async (req, res, next) => {
  const user = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  const token = generateToken(user._id);
  res.status(201).cookie("access_token", token, { httpOnly: true }).json({
    status: "success",
    user,
  });
});

exports.signIn = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }
  const token = generateToken(user._id);
  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .json({
      status: "success",
      user,
    });
});

exports.signOut = expressAsyncHandler(async (req, res, next) => {
  res.status(200).clearCookie("access_token").json({
    status: "success",
  });
});

exports.protect = expressAsyncHandler(async (req, res, next) => {
  //get token
  let token = req.cookies.access_token;
  if (!token) {
    return next(new ApiError("You are not logged in", 401));
  }

  //verify token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  //get user from the token
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  req.user = user;
  next();
});
