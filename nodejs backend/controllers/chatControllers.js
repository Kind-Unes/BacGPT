const Chat = require("../models/Chatmodel");
const User = require("../models/userModel");
const CreateChat = async (req, res) => {
  const { ChatName } = req.body;
  if (!ChatName) {
    return res.status(400).json({ error: "Chat name is required" });
  }

  var newChat = {
    name: ChatName,
    user: req.user._id,
  };
  try {
    const createcht = await Chat.create(newChat);
    const populatedChat = await Chat.findOne({ _id: createcht._id }).populate(
      "user",
      "-Password"
    );
    res.status(200).json(populatedChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const GetChats = async (req, res) => {
  try {
    var Chats = await Chat.find({
      user: req.user._id,
    })
      .populate("user", "-Password")
      .sort({ updatedAt: -1 });
    res.status(200).json(Chats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const renameChat = async (req, res) => {
  const { chatId, name } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: "Chat doesn't exist" });
  }
  if (!name) {
    return res.status(400).json({ error: "Cannot set name as undefined" });
  }
  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { name: name }
    );
    const populatedUpdatedChat = await Chat.findOne({ _id: updatedChat._id })
      .populate("user", "-Password");
    res.status(200).json(populatedUpdatedChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const DeleteChat = async (req, res) => {  
  const { chatId } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: "Chat doesn't exist" });
  }
  try {
    const deletedChat = await Chat.findOneAndDelete(
      { _id: chatId },
    );
    res.status(200).json(deletedChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
module.exports = {
  CreateChat,
  GetChats,
  renameChat,
  DeleteChat
};
