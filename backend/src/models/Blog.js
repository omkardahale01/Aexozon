import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  author: {
    type: String,
    default: 'AEXOZON Team',
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  seoTitle: {
    type: String,
  },
  seoKeywords: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
