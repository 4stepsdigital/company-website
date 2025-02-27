const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Change to String if it should be text
  information: { type: String },
});

const benefitsSchema = new mongoose.Schema({
  faq: [itemSchema], 
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceHero', required: true },
});

const ServiceFaq = mongoose.models.ServiceFaq||mongoose.model('ServiceFaq', benefitsSchema);
export default ServiceFaq;
