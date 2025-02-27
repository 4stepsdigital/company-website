import mongoose from "mongoose";
import "./Success";
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
    successItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SuccessSubItem",
      }]
  },
  { timestamps: true }
);

const TechSuccess =
  mongoose.models.TechSuccess || mongoose.model("TechSuccess", IndustrySchema);

export default TechSuccess;
