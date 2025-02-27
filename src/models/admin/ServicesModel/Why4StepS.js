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
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceHero",
      required: true,
    },
  },
  { timestamps: true }
);

const Why4StepService =
  mongoose.models.Why4StepService ||
  mongoose.model("Why4StepService", Why4StepsSolutionSchema);
export default Why4StepService;
