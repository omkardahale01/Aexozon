import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'Code',
  },
  features: [{
    type: String,
  }],
  price: {
    type: String,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
