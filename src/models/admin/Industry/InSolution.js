import mongoose from "mongoose";
import "./Industry";
import "./IndustrySolution";
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
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry1",
    },
    solutionItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubIndustrySolution",
      }]
  },
  { timestamps: true }
);

const InSolution =
  mongoose.models.InSolution || mongoose.model("InSolution", IndustrySchema);

export default InSolution;
