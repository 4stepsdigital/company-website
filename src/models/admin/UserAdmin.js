import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    refreshTokenExpiry: { type: Date },
  },
  { timestamps: true }
);
const UserAdmin =mongoose.models?.UserAdmin || mongoose.model("UserAdmin", userSchema);
export default UserAdmin;
