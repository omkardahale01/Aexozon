import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
  heroDescription: { type: String, default: '' },
  location: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  photo: { type: String, default: '' },
  resume: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  social: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  aboutUs: { type: String, default: '' },
  footerText: { type: String, default: '' },
  companyLogo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  siteName: { type: String, default: 'AEXOZON' },
  theme: {
    primaryColor: { type: String, default: '#06b6d4' }, // Cyan 500
    adminPrimaryColor: { type: String, default: '#06b6d4' }
  },
  ctaButtons: [{
    label: { type: String, default: '' },
    url: { type: String, default: '' },
    type: { type: String, enum: ['primary', 'secondary'], default: 'primary' }
  }],
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);
