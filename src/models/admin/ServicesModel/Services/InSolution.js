import mongoose from "mongoose";
import  "./IndustrySolution";
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
    serviceItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubServiceServices",
      }]
  },
  { timestamps: true }
);

const ServiceService =
  mongoose.models.ServiceService || mongoose.model("ServiceService", IndustrySchema);

export default ServiceService;
