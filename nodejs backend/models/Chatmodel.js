const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Chatmodel = new schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    name: {
      type: String,
      default: "",
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", Chatmodel);
