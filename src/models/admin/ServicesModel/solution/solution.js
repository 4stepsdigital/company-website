import mongoose from "mongoose";
import "../ServiceHero";
import  "./solutionItem";
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
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceHero",
    },
    solutionItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubServiceSolution",
      }]
  },
  { timestamps: true }
);

const ServiceSolution =
  mongoose.models.ServiceSolution || mongoose.model("ServiceSolution", IndustrySchema);

export default ServiceSolution;
