import mongoose from "mongoose";
import "./Industry";
import "./IndustrySolution";
import "./Success";

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
    successItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Success",
      }]
  },
  { timestamps: true }
);

const InSuccess =
  mongoose.models.InSuccess || mongoose.model("InSuccess", IndustrySchema);

export default InSuccess;
