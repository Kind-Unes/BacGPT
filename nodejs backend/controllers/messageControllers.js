const Message = require("../models/Messagemodel");
const Chat = require("../models/Chatmodel");
const User=require("../models/userModel")
//send message
const sendMessage = async (req, res) => {
  const { chatId, content, sender } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: "invalid chat id" });
  }
  if (!content) {
    return res.status(400).json({ error: "Empty message" });
  }
  try {
    const NewMessage = {
      sender: sender,
      chat: chatId,
      content: content,
    };
    var message = await Message.create(NewMessage);
    message = await Message.findOne({ _id: message._id })
      .populate("sender", "-Password")
      .populate("chat");
    res.status(200).json(message );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getMessages = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res.status(400).json({ error: "invalid chat id" });
  }
  try {
    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) {
      return res.status(400).json({ error: "Chat doesn't exist" });
    }
    let messages = await Message.find({
      chat: chatId,
    })
      .populate("chat")
      .sort({ updatedAt: 1 });
    messages = await User.populate(messages, {
      path: "chat.user",
      select: "Name Email",
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  sendMessage,
  getMessages,
};
