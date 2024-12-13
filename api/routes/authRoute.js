const express = require("express");
const { signIn, signUp, signOut } = require("../services/authService");
const {
  signUpValidator,
  signInValidator,
} = require("../utils/validator/authValidator");
const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);
router.route("/signin").post(signInValidator, signIn);
router.route("/signout").get(signOut);

module.exports = router;
