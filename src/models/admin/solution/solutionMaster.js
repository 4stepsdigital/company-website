import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.models.Solution ||
  mongoose.model("Solution", SolutionSchema);
