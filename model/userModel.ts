import mongoose, { Schema } from "mongoose";
import { UserModel } from "@/types/useSchema";

const userSchema: Schema<UserModel> = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    macth: [/.+\@.+\..+/, "please use valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
  },
  verifyCodeExpire: {
    type: Date,
  }
});

export default (mongoose.models.User as mongoose.Model<UserModel>) ||
  mongoose.model("User", userSchema);