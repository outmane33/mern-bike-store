const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Comment = require("../models/commentModel");
const apiFeature = require("../utils/apiFeature");

exports.createComment = expressAsyncHandler(async (req, res, next) => {
  const comment = await Comment.create({
    user: req.user._id,
    product: req.body.productId,
    content: req.body.content,
    title: req.body.title,
  });

  //populate user
  const populatedComment = await comment.populate("user", "userName");

  res.status(201).json({
    status: "success",
    comment: populatedComment,
  });
});

exports.getComments = expressAsyncHandler(async (req, res, next) => {
  const count = await Comment.countDocuments();
  const features = new apiFeature(Comment.find(), req.query)
    .pagination(count)
    .filter()
    .sort()
    .fields()
    .search();
  const { mongooseQuery, paginationResult } = features;

  const comments = await mongooseQuery;

  //last month total comments
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const lastMonthComments = await Comment.countDocuments({
    createdAt: { $gte: lastMonth },
  });

  //populate user
  await Comment.populate(comments, { path: "user", select: "userName" });

  res.status(200).json({
    status: "success",
    results: comments.length,
    totalComments: count,
    lastMonthComments,
    paginationResult,
    comments,
  });
});

exports.likeComment = expressAsyncHandler(async (req, res, next) => {
  //get comment by id
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ApiError("Comment not found", 404));
  }

  //check if user already liked the comment
  const userIndex = comment.likes.findIndex(
    (user) => user.toString() === req.user._id.toString()
  );
  if (userIndex > -1) {
    comment.likes.splice(userIndex, 1);
    comment.numberOfLikes -= 1;
  } else {
    comment.likes.push(req.user._id);
    comment.numberOfLikes += 1;
  }

  //save comment
  const updatedComment = await comment.save();

  res.status(200).json({
    status: "success",
    comment: updatedComment,
  });
});

exports.updateComment = expressAsyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      content: req.body.content,
    },
    {
      new: true,
    }
  );
  if (!comment) {
    return next(new ApiError("Comment not found", 404));
  }
  res.status(200).json({
    status: "success",
    comment,
  });
});

exports.deleteComment = expressAsyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
    return next(new ApiError("Comment not found", 404));
  }
  res.status(200).json({
    status: "success",
  });
});
