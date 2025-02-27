import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const TechnologyMaster= mongoose.models.TechnologyMaster ||
  mongoose.model("TechnologyMaster", SolutionSchema);

  export default TechnologyMaster
