import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
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

export default mongoose.model('Milestone', milestoneSchema);
