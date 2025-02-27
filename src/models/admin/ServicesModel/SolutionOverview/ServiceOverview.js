import mongoose from "mongoose";
import "../ServiceHero";
import "./ServiceOverviewItem";
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
    overviewItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceOverviewItem",
      }]
  },
  { timestamps: true }
);

const ServiceOverview =
  mongoose.models.ServiceOverview || mongoose.model("ServiceOverview", IndustrySchema);

export default ServiceOverview;
