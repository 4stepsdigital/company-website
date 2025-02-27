import mongoose from "mongoose";
import "./Why4StepsTech";
import "./Success1/InSuccess";
import "./solution1/InSolution";
import "./Product/InSolution";
import "./Services/InSolution";
import "./Benefits/Benefits";
import "./Faq/IndustryFaq";
import "./TechnologyMaster";
import "./TechnologyOverview/TechnologyOverview";
const IndustrySchema = new mongoose.Schema(
  {
    technologyName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
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

    contentsummary: {
      type: String,
    },
    path: {
      type: String,
      required: true,
    },
    why4step: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Why4StepsTech",
    },
    success: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechSuccess",
    },
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechSolution",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechProduct",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechService",
    },
    benefit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechBenefits",
    },
    faq: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechFaq",
    },
    overview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnologyOverview",
    },
  },
  { timestamps: true }
);

const TechnologyHero =
  mongoose.models.TechnologyHero ||
  mongoose.model("TechnologyHero", IndustrySchema);

export default TechnologyHero;
