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
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceHero",
    },
  },
  { timestamps: true }
);
const ServiceOverviewItem =
  mongoose.models.ServiceOverviewItem ||
  mongoose.model("ServiceOverviewItem", IndustrySchema);

export default ServiceOverviewItem;