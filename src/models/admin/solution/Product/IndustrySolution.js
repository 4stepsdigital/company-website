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

const SubSolutionProduct =
  mongoose.models.SubSolutionProduct || mongoose.model("SubSolutionProduct", IndustrySchema);

export default SubSolutionProduct;
