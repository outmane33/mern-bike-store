const express = require("express");
const {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  uploadProductImage,
  resizeImage,
  addProductImage,
  getAllProductImages,
  getAllCategories,
  getAllColors,
} = require("../services/productService");
const {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getProductValidator,
} = require("../utils/validator/productValidator");

const router = express.Router();

router.route("/").post(createProductValidator, addProduct).get(getAllProducts);
router.route("/slug/:slug").get(getProductBySlug);
router.route("/categories").get(getAllCategories);
router.route("/colors").get(getAllColors);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

router
  .route("/upload/image")
  .put(uploadProductImage, resizeImage, addProductImage)
  .get(getAllProductImages);
// .delete(deleteUserImage);

module.exports = router;
