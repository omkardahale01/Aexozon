import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  location: { type: String },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  responsibilities: [String],
  skillsUsed: [String],
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
