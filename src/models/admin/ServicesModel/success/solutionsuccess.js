import mongoose from "mongoose";

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
    description: {
      type: String,
      required: true,
    },

    link: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    keyword: {
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

const SubServiceSuccess=
  mongoose.models.SubServiceSuccess ||
  mongoose.model("SubServiceSuccess", IndustrySchema);

export default SubServiceSuccess;
