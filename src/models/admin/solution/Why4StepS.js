const { default: mongoose } = require("mongoose");
const miniSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const Why4StepsSolutionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    partnersData: [String],
    overviewData: [miniSchema],
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SolutionHero",
      required: true,
    },
  },
  { timestamps: true }
);

const Why4StepSolution =
  mongoose.models.Why4StepSolution ||
  mongoose.model("Why4StepSolution", Why4StepsSolutionSchema);
export default Why4StepSolution;
