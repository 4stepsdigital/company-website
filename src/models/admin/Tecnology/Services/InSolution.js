import mongoose from "mongoose";
import  "./IndustrySolution";

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
    serviceItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTechnologyServices",
      }]
  },
  { timestamps: true }
);

const TechService =
  mongoose.models.TechService || mongoose.model("TechService", IndustrySchema);

export default TechService;
