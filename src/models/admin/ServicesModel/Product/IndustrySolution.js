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
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceHero",
    },
  },
  { timestamps: true }
);

const SubServiceProduct =
  mongoose.models.SubServiceProduct || mongoose.model("SubServiceProduct", IndustrySchema);

export default SubServiceProduct;
