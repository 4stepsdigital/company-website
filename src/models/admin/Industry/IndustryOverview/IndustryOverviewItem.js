import mongoose from "mongoose";
const miniSchema = new mongoose.Schema({
  content: {
    type: String,
  },
});
const IndustrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    filename: {
      type: String,
      required: true,
    },
    editorHtmlDescription: [miniSchema],
    path: {
      type: String,
      required: true,
    },
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry1",
    },
  },
  { timestamps: true }
);
const IndustryOverviewItem =
  mongoose.models.IndustryOverviewItem ||
  mongoose.model("IndustryOverviewItem", IndustrySchema);

export default IndustryOverviewItem;