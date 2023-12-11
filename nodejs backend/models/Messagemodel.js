const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageModel = new schema(
  {
    sender: {
      type: String
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageModel);
