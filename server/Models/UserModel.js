import mongoose from "mongoose";

const user_Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: {
      type: String,
      required: true,
      default:
        "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user_Schema);

module.exports = User;
