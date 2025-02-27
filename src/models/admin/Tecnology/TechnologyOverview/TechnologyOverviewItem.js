import mongoose from "mongoose";
const miniSchema=new mongoose.Schema({
  content:{
    type:String
  }
})
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
    editorHtmlDescription:[miniSchema],
    path: {
      type: String,
      required: true,
    },
    technology: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnologyHero",
    },
  },
  { timestamps: true }
);
const TechnologyOverviewItem =
  mongoose.models.TechnologyOverviewItem ||
  mongoose.model("TechnologyOverviewItem", IndustrySchema);

export default TechnologyOverviewItem;