const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const path = require("path");
const fs = require("fs");
const util = require("util");
const Product = require("../models/productModel");
const ApiFeature = require("../utils/apiFeature");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadSigleImage } = require("../middlewares/uploadImageMiddleWare");

exports.addProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
});

//get product by id
exports.getProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});
//get product by title
exports.getProductBySlug = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});

exports.getAllProducts = expressAsyncHandler(async (req, res, next) => {
  // Initialize API features without pagination first
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .filter()
    .sort()
    .fields()
    .search("Product");

  // Get color counts using aggregation
  const colorCounts = await Product.aggregate([
    {
      $match: apiFeature.mongooseQuery.getQuery(),
    },
    {
      $unwind: "$colors", // Assuming colors is an array in your product schema
    },
    {
      $group: {
        _id: "$colors",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        color: "$_id",
        count: 1,
      },
    },
  ]);

  // Convert to object format for easier frontend use
  const colorCountObject = {
    Beige: 0,
    Black: 0,
    Blue: 0,
    Brown: 0,
    Gray: 0,
    Green: 0,
    Orange: 0,
    White: 0,
    Yellow: 0,
  };

  // Fill in the actual counts
  colorCounts.forEach(({ color, count }) => {
    if (colorCountObject.hasOwnProperty(color)) {
      colorCountObject[color] = count;
    }
  });

  // Get the filtered count before pagination
  const filteredCount = await Product.countDocuments(
    apiFeature.mongooseQuery.getQuery()
  );

  // Apply pagination after getting the filtered count
  apiFeature.pagination(filteredCount);

  // Execute the final query
  const { mongooseQuery, paginationResult } = apiFeature;
  const products = await mongooseQuery;

  res.status(200).json({
    status: "success",
    paginationResult,
    totalCount: filteredCount,
    results: products.length,
    products,
    colorCounts: colorCountObject,
  });
});

exports.updateProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
  });
});

//get all products category
exports.getAllCategories = expressAsyncHandler(async (req, res, next) => {
  const categories = await Product.distinct("category");
  res.status(200).json({
    status: "success",
    categories,
  });
});

//get all products color
exports.getAllColors = expressAsyncHandler(async (req, res, next) => {
  const colors = await Product.distinct("colors");
  res.status(200).json({
    status: "success",
    colors,
  });
});
// upload single image
exports.uploadProductImage = uploadSigleImage("image");

// image processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`api/uploads/products/${filename}`);
    req.body.image = filename;
  }
  next();
});

// add product image
exports.addProductImage = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body.image);
  res.status(200).json({
    status: "success",
    image: {
      name: req.body.image,
      path: `${process.env.BACKEND_URL}/products/${req.body.image}`,
    },
  });
});

// Convert fs functions to promises
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

//get all product images
exports.getAllProductImages = expressAsyncHandler(async (req, res, next) => {
  try {
    // Define the uploads directory path
    const uploadsDir = path.join(__dirname, "../uploads/products");

    // Read all files in the directory
    const files = await readdir(uploadsDir);

    // Filter for image files
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Create full paths and get file stats
    const imageDetails = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(uploadsDir, file);
        const stats = await stat(filePath);

        return {
          name: file,
          path: `${process.env.BACKEND_URL}/products/${file}`,
          size: stats.size,
          lastModified: stats.mtime,
        };
      })
    );

    res.json({
      success: true,
      count: imageFiles.length,
      images: imageDetails,
    });
  } catch (error) {
    console.error("Error reading product images:", error);
    res.status(500).json({
      success: false,
      message: "Failed to read product images",
      error: error.message,
    });
  }
});
