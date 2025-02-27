import mongoose from "mongoose";

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
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SolutionHero",
    },
  },
  { timestamps: true }
);

const SolutionSuccessItem =
  mongoose.models.SolutionSuccessItem ||
  mongoose.model("SolutionSuccessItem", IndustrySchema);

export default SolutionSuccessItem;
