import mongoose from "mongoose";
import "./success/success";
import "./Why4StepS";
import "./solution/solution";
import "./Services/InSolution";
import "./Product/InSolution";
import "./Benefits/Benefits";
import "./Faq/IndustryFaq";
import "./solutionMaster";
import "./SolutionOverview/SolutionOverview";
const SolutionHeroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  solutionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },

  // contentsummary: {
  //   type: String,
  //   required: true,
  // },
  solutionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Solution",
  },
  Why4StepS: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Why4StepSolution",
  },
  success: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SolutionSuccess",
  },
  solution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SolutionSolution",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SolutionProduct",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SolutionService",
  },
  benefit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SolutionBenefits",
  },
  faq: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SolutionFaq",
  },
  overview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SolutionOverview",
  },
});
const SolutionHero =
  mongoose.models.SolutionHero ||
  mongoose.model("SolutionHero", SolutionHeroSchema);

export default SolutionHero;
