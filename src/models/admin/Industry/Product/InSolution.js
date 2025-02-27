import mongoose from "mongoose";
import  "./IndustrySolution";
import "../Industry";
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
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry1",
    },
    productItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubIndustryProduct",
      }]
  },
  { timestamps: true }
);

const InProduct =
  mongoose.models.InProduct || mongoose.model("InProduct", IndustrySchema);

export default InProduct;
