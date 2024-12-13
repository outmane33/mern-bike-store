const express = require("express");
const { getUser, getAllUsers } = require("../services/userService");

const router = express.Router();

router.route("/").get(getAllUsers);

module.exports = router;
