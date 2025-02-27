import mongoose from "mongoose";
import  "./IndustrySolution";
import "../TechnologyHero";

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
    technology: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnologyHero",
    },
    productItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTechnologyProduct",
      }]
  },
  { timestamps: true }
);

const TechProduct =
  mongoose.models.TechProduct || mongoose.model("TechProduct", IndustrySchema);

export default TechProduct;
