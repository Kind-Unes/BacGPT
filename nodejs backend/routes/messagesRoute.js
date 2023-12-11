const express = require("express");
const { requireAuth } = require("../requireAuth/requireAuth");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageControllers");

const router = express.Router();
//send message
router.route("/").post(requireAuth, sendMessage);
//fetching messages
router.route("/:chatId").get(requireAuth, getMessages);

module.exports = router;
