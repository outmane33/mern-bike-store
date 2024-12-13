const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ApiFeature = require("../utils/apiFeature");

exports.getUser = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

exports.getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const count = await User.countDocuments();
  const apiFeature = new ApiFeature(User.find(), req.query)
    .pagination(count)
    .filter()
    .sort()
    .fields()
    .search();
  const { mongooseQuery, paginationResult } = apiFeature;

  const users = await mongooseQuery;
  res.status(200).json({
    status: "success",
    paginationResult,
    users,
  });
});
