const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const ApiError = require("../apiError");
const Product = require("../../models/productModel");
const slugify = require("slugify");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product title must be between 3 and 100 characters")
    .custom(async (value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("small_description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 3, max: 2000 })
    .withMessage("Product description must be between 3 and 2000 characters"),
  // check("long_description")
  //   .notEmpty()
  //   .withMessage("Product description is required")
  //   .isLength({ min: 3, max: 5000 })
  //   .withMessage("Product description must be between 3 and 2000 characters"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id format"),
  check("title")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Product title must be between 3 and 100 characters")
    .custom(async (value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("small_description")
    .optional()
    .isLength({ min: 3, max: 2000 })
    .withMessage("Product description must be between 3 and 2000 characters"),
  check("long_description")
    .optional()
    .isLength({ min: 3, max: 5000 })
    .withMessage("Product description must be between 3 and 2000 characters"),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("Product price must be a number"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id format"),
  validatorMiddleware,
];
