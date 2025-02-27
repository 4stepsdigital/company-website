import mongoose from "mongoose";
import "./Why4Steps";
const IndustrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    filename: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    link: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    keyword: {
      type: String,
    },
    path: {
      type: String,
      required: true,
    },
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry1",
    },
  },
  { timestamps: true }
);

const Success =
  mongoose.models.Success || mongoose.model("Success", IndustrySchema);

export default Success;
