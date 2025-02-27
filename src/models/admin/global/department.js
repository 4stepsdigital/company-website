import mongoose from 'mongoose';

const IndustrySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Depatment= mongoose.models.Depatment || mongoose.model('Depatment', IndustrySchema);
export default Depatment
