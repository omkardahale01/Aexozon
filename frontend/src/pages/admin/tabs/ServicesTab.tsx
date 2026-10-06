import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit3, Save, X, Layout } from 'lucide-react';
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

export const ServicesTab = ({ token }: { token: string | null }) => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const blank = { title: '', description: '', icon: 'Code', features: '', price: '', order: 0, isVisible: true };
  const [form, setForm] = useState(blank);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (e) { toast.error('Failed to load services'); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blank); setEditing(null); setShowForm(true); };
  const openEdit = (item: any) => {
    setForm({
      title: item.title, description: item.description, icon: item.icon,
      features: item.features ? item.features.join(', ') : '',
      price: item.price || '', order: item.order || 0, isVisible: item.isVisible
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const body = {
      ...form,
      features: form.features.split(',').map((s: string) => s.trim()).filter(Boolean)
    };
    
    try {
      const url = editing ? `${API}/services/${editing._id}` : `${API}/services`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? 'Service updated!' : 'Service created!');
        setShowForm(false);
        load();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch (e) { toast.error('Error saving service'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      const res = await fetch(`${API}/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) { toast.success('Deleted'); load(); }
    } catch (e) { toast.error('Failed to delete'); }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-display text-white">Services Offered</h2>
        <button onClick={openNew} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">{editing ? 'Edit Service' : 'New Service'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title *" value={form.title} onChange={set('title')} placeholder="Web Development" />
            <Input label="Icon Name" value={form.icon} onChange={set('icon')} placeholder="Code, Smartphone, Database..." />
            <Input label="Price (Optional)" value={form.price} onChange={set('price')} placeholder="Starting at $999" />
            <Input label="Display Order" type="number" value={form.order} onChange={set('order')} />
          </div>
          <div className="mt-4 space-y-4">
            <TextArea label="Description *" value={form.description} onChange={set('description')} rows={3} placeholder="We build scalable websites..." />
            <TextArea label="Features (comma-separated)" value={form.features} onChange={set('features')} rows={2} placeholder="Responsive, SEO Friendly, Fast" />
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={form.isVisible} onChange={e => setForm(p => ({ ...p, isVisible: e.target.checked }))} className="rounded bg-[#0a0a0f] border-white/20" />
              Visible on Public Website
            </label>
          </div>
          <div className="mt-5 flex gap-3 justify-end">
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium">Cancel</button>
            <button onClick={handleSave} disabled={saving || !form.title} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <Card key={item._id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-white truncate">{item.title}</h4>
                {!item.isVisible && <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Hidden</span>}
              </div>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="text-center text-gray-500 py-10">No services created yet.</p>}
      </div>
    </div>
  );
};
