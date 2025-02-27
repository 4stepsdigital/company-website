import mongoose from "mongoose";
import "../solutionHero";
import  "./SolutionOverviewItem";
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
    overviewItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SolutionOverviewItem",
      }]
  },
  { timestamps: true }
);

const SolutionOverview =
  mongoose.models.SolutionOverview || mongoose.model("SolutionOverview", IndustrySchema);

export default SolutionOverview;
