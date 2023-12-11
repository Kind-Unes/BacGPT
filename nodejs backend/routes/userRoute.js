const express = require("express");
const {
  loginUser,
  signupUser,
  UserInfo,
} = require("../controllers/userControllers");
const { requireAuth } = require("../requireAuth/requireAuth");
const router = express.Router();
//login user
router.post("/login", loginUser);
//signup user
router.post("/signup", signupUser);
//fetching user info
router.route("/UserInfo").get(requireAuth, UserInfo);
module.exports = router;
