import mongoose from "mongoose";
import "./solutionsuccess";
import "../solutionHero";

const IndustrySchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mainEditorHtmlDescription:{
        type:String,
        required:true
    },
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SolutionHero",
    },
    successItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SolutionSuccessItem",
      }]
  },
  { timestamps: true }
);

const SolutionSuccess =
  mongoose.models.SolutionSuccess || mongoose.model("SolutionSuccess", IndustrySchema);

export default SolutionSuccess;
