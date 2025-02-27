const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Change to String if it should be text
  information: { type: String },
});

const benefitsSchema = new mongoose.Schema({
  faq: [itemSchema], 
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
});

const IndustryFaq = mongoose.models.IndustryFaq||mongoose.model('IndustryFaq', benefitsSchema);
export default IndustryFaq;
