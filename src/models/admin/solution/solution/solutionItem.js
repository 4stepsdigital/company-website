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

    link: {
      type: String,
    }, 
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
const SolutionSolutionItem =
  mongoose.models.SolutionSolutionItem ||
  mongoose.model("SolutionSolutionItem", IndustrySchema);

export default SolutionSolutionItem;
