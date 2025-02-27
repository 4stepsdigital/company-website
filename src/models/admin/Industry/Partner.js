import mongoose from 'mongoose';

const iconSchema1 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Partner= mongoose.models.Partner || mongoose.model('Partner', iconSchema1);
export default Partner
