const express = require("express");
const {
  createComment,
  getComments,
  likeComment,
  updateComment,
  deleteComment,
} = require("../services/commentService");

const { protect } = require("../services/authService");
const {
  createCommentValidator,
  deleteCommentValidator,
} = require("../utils/validator/commentValidator");
const router = express.Router();

router.route("/").post(protect, createComment).get(getComments);
router
  .route("/:id")
  .put(protect, updateComment)
  .delete(protect, deleteCommentValidator, deleteComment);
router.route("/like/:id").put(protect, likeComment);

module.exports = router;
