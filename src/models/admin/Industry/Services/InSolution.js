import mongoose from "mongoose";
import  "./IndustrySolution";
import "../Industry";
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
    serviceItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubIndustryServices",
      }]
  },
  { timestamps: true }
);

const InService =
  mongoose.models.InService || mongoose.model("InService", IndustrySchema);

export default InService;
