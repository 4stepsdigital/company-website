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
    technology: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnologyHero",
    },
  },
  { timestamps: true }
);

const SubTechnologySolution =
  mongoose.models.SubTechnologySolution || mongoose.model("SubTechnologySolution", IndustrySchema);

export default SubTechnologySolution;
