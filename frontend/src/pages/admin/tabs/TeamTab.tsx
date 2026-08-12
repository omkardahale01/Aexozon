import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit3, Save, X, Users, Image as ImageIcon } from 'lucide-react';
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

export const TeamTab = ({ token }: { token: string | null }) => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const blank = { name: '', role: '', bio: '', image: '', linkedin: '', github: '', twitter: '', order: 0, isVisible: true };
  const [form, setForm] = useState(blank);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/team`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (e) { toast.error('Failed to load team'); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blank); setEditing(null); setShowForm(true); };
  const openEdit = (item: any) => {
    setForm({
      name: item.name, role: item.role, bio: item.bio, image: item.image,
      linkedin: item.social?.linkedin || '', github: item.social?.github || '', twitter: item.social?.twitter || '',
      order: item.order || 0, isVisible: item.isVisible
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        name: form.name, role: form.role, bio: form.bio, image: form.image, order: form.order, isVisible: form.isVisible,
        social: { linkedin: form.linkedin, github: form.github, twitter: form.twitter }
      };
      const url = editing ? `${API}/team/${editing._id}` : `${API}/team`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? 'Team member updated!' : 'Team member added!');
        setShowForm(false);
        load();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch (e) { toast.error('Error saving team member'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this team member?')) return;
    try {
      const res = await fetch(`${API}/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) { toast.success('Removed'); load(); }
    } catch (e) { toast.error('Failed to delete'); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setForm(prev => ({ ...prev, image: data.url }));
        toast.success('Photo uploaded!');
      }
    } catch { toast.error('Upload failed'); }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-display text-white">Team Members</h2>
        <button onClick={openNew} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-4">
            <h3 className="text-lg font-semibold text-white">{editing ? 'Edit Member' : 'New Member'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name *" value={form.name} onChange={set('name')} placeholder="John Doe" />
            <Input label="Job Role *" value={form.role} onChange={set('role')} placeholder="Lead Developer" />
            <div className="md:col-span-2">
              <TextArea label="Short Bio" value={form.bio} onChange={set('bio')} rows={2} placeholder="Expert in React..." />
            </div>
            
            <div className="md:col-span-2 flex items-center gap-4 py-2">
              {form.image ? (
                <img src={form.image.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${form.image}` : form.image} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/30" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <label className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> {form.image ? 'Change Photo' : 'Upload Photo'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            <Input label="LinkedIn URL" value={form.linkedin} onChange={set('linkedin')} />
            <Input label="GitHub URL" value={form.github} onChange={set('github')} />
            <Input label="Twitter URL" value={form.twitter} onChange={set('twitter')} />
            <Input label="Display Order" type="number" value={form.order} onChange={set('order')} />
            
            <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-300 cursor-pointer pt-2">
              <input type="checkbox" checked={form.isVisible} onChange={e => setForm(p => ({ ...p, isVisible: e.target.checked }))} className="rounded bg-[#0a0a0f] border-white/20" />
              Visible on Public Website
            </label>
          </div>
          <div className="mt-6 flex gap-3 justify-end border-t border-white/5 pt-4">
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium">Cancel</button>
            <button onClick={handleSave} disabled={saving || !form.name || !form.role} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Member'}
            </button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <Card key={item._id} className="p-5 flex items-center gap-4">
            {item.image ? (
              <img src={item.image.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${item.image}` : item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h4 className="font-semibold text-white truncate text-base">{item.name}</h4>
                {!item.isVisible && <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-[10px] uppercase border border-red-500/20">Hidden</span>}
              </div>
              <p className="text-xs text-cyan-400 mb-1">{item.role}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEdit(item)} className="text-gray-400 hover:text-cyan-400 transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && <div className="col-span-full"><p className="text-center text-gray-500 py-10">No team members added yet.</p></div>}
      </div>
    </div>
  );
};
