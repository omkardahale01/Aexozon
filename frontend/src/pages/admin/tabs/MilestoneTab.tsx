import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit3, Save, X, Target } from 'lucide-react';
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

export const MilestoneTab = ({ token }: { token: string | null }) => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const blank = { title: '', date: '', description: '', order: 0, isVisible: true };
  const [form, setForm] = useState(blank);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/milestones`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (e) { toast.error('Failed to load milestones'); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blank); setEditing(null); setShowForm(true); };
  const openEdit = (item: any) => {
    setForm({
      title: item.title, date: item.date, description: item.description,
      order: item.order || 0, isVisible: item.isVisible
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `${API}/milestones/${editing._id}` : `${API}/milestones`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? 'Milestone updated!' : 'Milestone created!');
        setShowForm(false);
        load();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch (e) { toast.error('Error saving milestone'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this milestone?')) return;
    try {
      const res = await fetch(`${API}/milestones/${id}`, {
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
        <h2 className="text-xl font-bold font-display text-white">Company Milestones (Timeline)</h2>
        <button onClick={openNew} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Milestone
        </button>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-4">
            <h3 className="text-lg font-semibold">{editing ? 'Edit Milestone' : 'New Milestone'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <Input label="Title *" value={form.title} onChange={set('title')} placeholder="Founded the company" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Date/Year *" value={form.date} onChange={set('date')} placeholder="2020 / Jan 2020" />
              <Input label="Display Order" type="number" value={form.order} onChange={set('order')} />
            </div>
            <TextArea label="Description" value={form.description} onChange={set('description')} rows={3} placeholder="Started in a small garage..." />
            
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer pt-2">
              <input type="checkbox" checked={form.isVisible} onChange={e => setForm(p => ({ ...p, isVisible: e.target.checked }))} className="rounded bg-[#0a0a0f] border-white/20" />
              Visible on Public Website
            </label>
          </div>
          <div className="mt-5 flex gap-3 justify-end border-t border-white/5 pt-4">
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium">Cancel</button>
            <button onClick={handleSave} disabled={saving || !form.title || !form.date} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Milestone'}
            </button>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {items.map(item => (
          <div key={item._id} className="relative pl-8 sm:pl-32 py-2 group">
            {/* Timeline Line */}
            <div className="hidden sm:block absolute left-24 top-0 bottom-0 w-px bg-white/10 group-last:bottom-auto group-last:h-full"></div>
            {/* Timeline Dot */}
            <div className="hidden sm:block absolute left-[91px] top-8 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-[#0a0a0f]"></div>
            
            <Card className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Date (Mobile vs Desktop) */}
              <div className="sm:hidden font-mono text-cyan-400 text-sm">{item.date}</div>
              <div className="hidden sm:block absolute left-0 top-7 w-20 text-right font-mono text-cyan-400 text-sm pr-2">{item.date}</div>

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white text-base">{item.title}</h4>
                  {!item.isVisible && <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">Hidden</span>}
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0 sm:pt-2">
                <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </Card>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-gray-500 py-10">No milestones recorded.</p>}
      </div>
    </div>
  );
};
