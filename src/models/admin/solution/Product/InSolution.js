import mongoose from "mongoose";
import "./IndustrySolution";
import  "../solutionHero";
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
    productItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSolutionProduct",
      }]
  },
  { timestamps: true }
);

const SolutionProduct =
  mongoose.models.SolutionProduct || mongoose.model("SolutionProduct", IndustrySchema);

export default SolutionProduct;
