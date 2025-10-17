import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const user_Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: {
      type: String,
      default:
        "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png",
    },
  },
  { timestamps: true }
);

user_Schema.methods.generateRefeshToken = function(){
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET_KEY
  );
}

user_Schema.pre('save', async (next) =>{
  if(!this.modified){
    next();
  }
})

const User = mongoose.model("User", user_Schema);
export default User;
