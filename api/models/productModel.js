const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide product title"],
      maxlength: [100, "Product title can not be more than 32 characters"],
      minlength: [3, "Product title can not be less than 3 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    small_description: {
      type: String,
      required: [true, "Please provide product description"],
      minlength: [3, "Description can not be less than 20 characters"],
      maxlength: [2000, "Description can not be more than 2000 characters"],
    },
    long_description: {
      type: String,
      // required: [true, "Please provide product description"],
      minlength: [3, "Description can not be less than 20 characters"],
      maxlength: [5000, "Description can not be more than 2000 characters"],
    },
    quantity: {
      type: Number,
      default: 0,
      required: [true, "Please provide product quantity"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
      trim: true,
      min: [20, "Product price can not be more than 20 characters"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Please provide product cover image"],
    },
    images: [String],
    category: [String],
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
