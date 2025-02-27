import mongoose from "mongoose";
import "../Industry";
import "./IndustryOverviewItem";
const IndustrySchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    mainEditorHtmlDescription: {
      type: String,
      required: true,
    },
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry1",
    },
    overviewItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndustryOverviewItem",
      },
    ],
  },
  { timestamps: true }
);

const IndustryOverview =
  mongoose.models.IndustryOverview ||
  mongoose.model("IndustryOverview", IndustrySchema);

export default IndustryOverview;
