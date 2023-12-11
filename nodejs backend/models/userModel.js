const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;
const UserModel = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
UserModel.statics.signup = async function (Name, Email, Password) {
  //checking if all fields are filled
  if (!Name || !Email || !Password) {
    throw new Error("all fields are required");
  }
  //checking if email is valid
  if (!validator.isEmail(Email)) {
    throw new Error("Email does't exist");
  }
  //checking if password is strong enough
  if (!validator.isStrongPassword(Password)) {
    throw new Error("Password not Strong enough");
  }
  //checking if email or name already exists
  const exists = await this.findOne({ Email });
  const nameExists = await this.findOne({ Name });
  if (exists) {
    throw new Error("Email already in use");
  }
  if (nameExists) {
    throw new Error("Name already in use");
  }

  //hashing the password and creating a document in the db
  const salt = await bcrypt.genSalt(13);
  const hash = await bcrypt.hash(Password, salt);
  const user = await this.create({ Name, Email, Password: hash });
  return user;
};
UserModel.statics.login = async function (Email, Password) {
  //checking if all fields are filled
  if (!Email || !Password) {
    throw new Error("All fields are required");
  }
  //checking if email is valid
  if (!validator.isEmail(Email)) {
    throw new Error("Email does't exist");
  }
  //checking if email exists before
  const User = await this.findOne({ Email });
  if (!User) {
    throw new Error("Email does't exist");
  }
  //checking if password is correct
  const compare = await bcrypt.compare(Password, User.Password);
  if (!compare) {
    throw new Error("Wrong password");
  }
  return User;
};

module.exports = mongoose.model("User", UserModel);
