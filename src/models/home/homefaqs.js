import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HomeFaq = mongoose.models.HomeFaq || mongoose.model("HomeFaq", faqSchema);

export default HomeFaq;
