const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Change to String if it should be text
  information: { type: String },
});

const benefitsSchema = new mongoose.Schema({
  faq: [itemSchema], 
  technology: { type: mongoose.Schema.Types.ObjectId, ref: 'TechnologyHero', required: true },
});

const TechFaq = mongoose.models.TechFaq||mongoose.model('TechFaq', benefitsSchema);
export default TechFaq;
