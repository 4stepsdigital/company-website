const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Change to String if it should be text
  information: { type: String },
});

const benefitsSchema = new mongoose.Schema({
  faq: [itemSchema], 
  solution: { type: mongoose.Schema.Types.ObjectId, ref: 'SolutionHero', required: true },
});

const SolutionFaq = mongoose.models.SolutionFaq||mongoose.model('SolutionFaq', benefitsSchema);
export default SolutionFaq;
