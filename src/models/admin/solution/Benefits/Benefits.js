const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Change to String if it should be text
  description: { type: String },
});

const benefitsSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String },
  items: [itemSchema], // Array of items
  solution: { type: mongoose.Schema.Types.ObjectId, ref: 'SolutionHero', required: true },
});

const SolutionBenefits = mongoose.models.SolutionBenefits||mongoose.model('SolutionBenefits', benefitsSchema);
export default SolutionBenefits;
