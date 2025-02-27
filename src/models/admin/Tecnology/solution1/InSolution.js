import mongoose from "mongoose";
import "./IndustrySolution";
import "../TechnologyHero";
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
    technology: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnologyHero",
    },
    solutionItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTechnologySolution",
      }]
  },
  { timestamps: true }
);

const TechSolution =
  mongoose.models.TechSolution || mongoose.model("TechSolution", IndustrySchema);

export default TechSolution;
