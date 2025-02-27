const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Change to String if it should be text
  description: { type: String },
});

const benefitsSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String },
  items: [itemSchema], // Array of items
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
});

const Benefits = mongoose.models.Benefits||mongoose.model('Benefits', benefitsSchema);
export default Benefits;
