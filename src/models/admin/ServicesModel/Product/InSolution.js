import mongoose from "mongoose";
import "./IndustrySolution";
import "../ServiceHero";
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
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceHero",
    },
    productItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubServiceProduct",
      }]

  },
  { timestamps: true }
);

const ServiceProduct =
  mongoose.models.ServiceProduct || mongoose.model("ServiceProduct", IndustrySchema);

export default ServiceProduct;
