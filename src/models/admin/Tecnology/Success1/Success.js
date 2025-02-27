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
    technology: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnologyHero",
    },
  },
  { timestamps: true }
);

const SuccessSubItem =
  mongoose.models.SuccessSubItem || mongoose.model("SuccessSubItem", IndustrySchema);

export default SuccessSubItem;
