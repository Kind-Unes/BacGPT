const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoute");
const messagesRoutes = require("./routes/messagesRoute");
const chatRouter = require("./routes/chatRouter");
const { requireAuth } = require("./requireAuth/requireAuth");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRouter);
app.use("/api/message", messagesRoutes);
mongoose
  .connect(process.env.URI)
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(
        "connected to the db and listening at port : ",
        process.env.PORT
      );
    });
  })
  .catch((error) => console.log(error.message));
