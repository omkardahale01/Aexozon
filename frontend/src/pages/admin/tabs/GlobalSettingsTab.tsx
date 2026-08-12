import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#12121a] border border-white/5 rounded-2xl ${className}`}>{children}</div>
);

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
    <input {...props} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors" />
  </div>
);

const TextArea = ({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
    <textarea {...props} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors resize-none" />
  </div>
);

export const GlobalSettingsTab = ({ token, portfolio, refreshData }: { token: string | null; portfolio: any; refreshData: () => void }) => {
  const [form, setForm] = useState({
    siteName: '', tagline: '', aboutUs: '', footerText: '', email: '', phone: '', location: '',
    companyLogo: '', favicon: '', primaryColor: '#06b6d4', adminPrimaryColor: '#06b6d4',
    linkedin: '', github: '', twitter: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const p = portfolio as Record<string, any> || {};
    const social = p.social || {};
    const theme = p.theme || {};
    setForm({
      siteName: p.siteName || 'AEXOZON',
      tagline: p.tagline || '',
      aboutUs: p.aboutUs || '',
      footerText: p.footerText || '',
      email: p.email || '',
      phone: p.phone || '',
      location: p.location || '',
      companyLogo: p.companyLogo || p.photo || '',
      favicon: p.favicon || '',
      primaryColor: theme.primaryColor || '#06b6d4',
      adminPrimaryColor: theme.adminPrimaryColor || '#06b6d4',
      linkedin: social.linkedin || '',
      github: social.github || '',
      twitter: social.twitter || ''
    });
  }, [portfolio]);

  const handleSave = async () => {
    setSaving(true);
    const body = {
      siteName: form.siteName, tagline: form.tagline, aboutUs: form.aboutUs, footerText: form.footerText,
      email: form.email, phone: form.phone, location: form.location,
      companyLogo: form.companyLogo, favicon: form.favicon,
      theme: { primaryColor: form.primaryColor, adminPrimaryColor: form.adminPrimaryColor },
      social: { linkedin: form.linkedin, github: form.github, twitter: form.twitter }
    };
    
    try {
      const res = await fetch(`${API}/portfolio/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Global settings updated!');
        refreshData();
      } else {
        toast.error('Failed to update settings');
      }
    } catch (e) {
      toast.error('An error occurred');
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'companyLogo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm(prev => ({ ...prev, [field]: data.url }));
        toast.success('Image uploaded!');
      }
    } catch { toast.error('Upload failed'); }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-5">Website Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Site Name (Company Name)" value={form.siteName} onChange={set('siteName')} placeholder="AEXOZON" />
          <Input label="Tagline" value={form.tagline} onChange={set('tagline')} placeholder="Next Generation Software" />
          
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Company Logo</label>
            <div className="flex items-center gap-3">
              {form.companyLogo && <img src={form.companyLogo.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${form.companyLogo}` : form.companyLogo} alt="Logo" className="w-12 h-12 rounded bg-white/5 object-contain border border-white/10 p-1" />}
              <label className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'companyLogo')} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Favicon</label>
            <div className="flex items-center gap-3">
              {form.favicon && <img src={form.favicon.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${form.favicon}` : form.favicon} alt="Favicon" className="w-8 h-8 rounded bg-white/5 object-contain border border-white/10 p-1" />}
              <label className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'favicon')} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Website Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.primaryColor} onChange={set('primaryColor')} className="w-10 h-10 rounded border border-white/10 bg-transparent cursor-pointer" />
              <span className="text-gray-300">{form.primaryColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Admin Panel Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.adminPrimaryColor} onChange={set('adminPrimaryColor')} className="w-10 h-10 rounded border border-white/10 bg-transparent cursor-pointer" />
              <span className="text-gray-300">{form.adminPrimaryColor}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-5">Company Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email Address" value={form.email} onChange={set('email')} />
          <Input label="Phone Number" value={form.phone} onChange={set('phone')} />
          <div className="md:col-span-2">
            <Input label="Office Location" value={form.location} onChange={set('location')} />
          </div>
          <div className="md:col-span-2">
            <TextArea label="About Us (Company History)" value={form.aboutUs} onChange={set('aboutUs')} rows={4} />
          </div>
          <div className="md:col-span-2">
            <TextArea label="Footer Copyright Text" value={form.footerText} onChange={set('footerText')} rows={2} />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-5">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="LinkedIn" value={form.linkedin} onChange={set('linkedin')} />
          <Input label="GitHub / Portfolio" value={form.github} onChange={set('github')} />
          <Input label="Twitter / X" value={form.twitter} onChange={set('twitter')} />
        </div>
      </Card>

      <div className="flex justify-end pb-10">
        <button onClick={handleSave} disabled={saving} className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};
