import mongoose from "mongoose";
import  "../TechnologyHero";
import  "./TechnologyOverviewItem";
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
    overviewItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TechnologyOverviewItem",
      }]
  },
  { timestamps: true }
);

const TechnologyOverview =
  mongoose.models.TechnologyOverview || mongoose.model("TechnologyOverview", IndustrySchema);

export default TechnologyOverview;
