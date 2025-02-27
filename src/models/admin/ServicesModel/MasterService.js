import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema({
  name: { type: String, required: true,trim:true },
  description: { type: String,trim:true},
});

const MasterService= mongoose.models.MasterService ||
  mongoose.model("MasterService", SolutionSchema);


  export default MasterService;