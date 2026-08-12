import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  seoTitle: { type: String, default: 'Santosh Khandagale Portfolio' },
  seoDescription: { type: String, default: '' },
  seoKeywords: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  siteStatus: { type: String, enum: ['live', 'maintenance'], default: 'live' },
}, { timestamps: true });

export default mongoose.model('SiteSettings', siteSettingsSchema);
