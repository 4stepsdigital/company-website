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
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SolutionHero",
    },
  },
  { timestamps: true }
);
const SolutionOverviewItem =
  mongoose.models.SolutionOverviewItem ||
  mongoose.model("SolutionOverviewItem", IndustrySchema);

export default SolutionOverviewItem;
