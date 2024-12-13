const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const ApiError = require("../apiError");
const Product = require("../../models/productModel");
const Comment = require("../../models/commentModel");

exports.createCommentValidator = [
  check("productId")
    .notEmpty()
    .withMessage("product id is required")
    .isMongoId()
    .withMessage("invalid product id format")
    .custom(async (val, { req }) => {
      const product = await Product.findById(val);
      if (!product) {
        throw new ApiError("product not found", 404);
      }
      return true;
    }),
  check("content").notEmpty().withMessage("content is required"),
  validatorMiddleware,
];

exports.deleteCommentValidator = [
  check("id")
    .notEmpty()
    .withMessage("comment id is required")
    .isMongoId()
    .withMessage("invalid comment id format")
    .custom(async (val, { req }) => {
      //check if user is the owner
      if (req.user.role === "user") {
        const comment = await Comment.findOne({ _id: val, user: req.user._id });
        if (!comment) {
          throw new ApiError("you are not the owner", 404);
        }
      }
      return true;
    }),
  validatorMiddleware,
];
