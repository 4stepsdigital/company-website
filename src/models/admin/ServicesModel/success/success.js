import mongoose from "mongoose";
import "./solutionsuccess";
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
    successItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubServiceSuccess",
      }]
  },
  { timestamps: true }
);

const ServiceSuccess =
  mongoose.models.ServiceSuccess || mongoose.model("ServiceSuccess", IndustrySchema);

export default ServiceSuccess;
