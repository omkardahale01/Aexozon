import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  skills: [{
    name: String,
    level: Number
  }],
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
