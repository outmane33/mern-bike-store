const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

exports.addToWishlist = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        wishList: req.body.productId,
      },
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    wishList: user.wishList,
  });
});

exports.getLoggedUserWishlist = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate(
    "wishList",
    "title price quantity imageCover"
  );
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    count: user.wishList.length,
    wishList: user.wishList,
  });
});

exports.removeProductFromWishlist = expressAsyncHandler(
  async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          wishList: req.params.id,
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      return next(new ApiError("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      count: user.wishList.length,
      wishList: user.wishList,
    });
  }
);
