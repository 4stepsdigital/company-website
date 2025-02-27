import mongoose from "mongoose";
import  "./IndustrySolution";
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
    serviceItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSolutionServices",
      }]
  },
  { timestamps: true }
);

const SolutionService =
  mongoose.models.SolutionService || mongoose.model("SolutionService", IndustrySchema);

export default SolutionService;
