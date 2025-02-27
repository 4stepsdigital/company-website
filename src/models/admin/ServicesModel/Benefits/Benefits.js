const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Change to String if it should be text
  description: { type: String },
});

const benefitsSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String },
  items: [itemSchema], // Array of items
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceHero', required: true },
});

const ServiceBenefits = mongoose.models.ServiceBenefits||mongoose.model('ServiceBenefits', benefitsSchema);
export default ServiceBenefits;
