import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  technologies: [String],
  image: { type: String },
  githubUrl: { type: String },
  liveUrl: { type: String },
  features: [String],
  category: { type: String, default: 'Web Development' },
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
