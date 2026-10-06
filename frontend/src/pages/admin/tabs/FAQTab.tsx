import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit3, Save, X, MessageCircle } from 'lucide-react';
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

export const FAQTab = ({ token }: { token: string | null }) => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const blank = { question: '', answer: '', category: 'General', order: 0, isVisible: true };
  const [form, setForm] = useState(blank);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/faqs`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (e) { toast.error('Failed to load FAQs'); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blank); setEditing(null); setShowForm(true); };
  const openEdit = (item: any) => {
    setForm({
      question: item.question, answer: item.answer, category: item.category,
      order: item.order || 0, isVisible: item.isVisible
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `${API}/faqs/${editing._id}` : `${API}/faqs`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? 'FAQ updated!' : 'FAQ created!');
        setShowForm(false);
        load();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch (e) { toast.error('Error saving FAQ'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      const res = await fetch(`${API}/faqs/${id}`, {
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
        <h2 className="text-xl font-bold font-display text-white">Frequently Asked Questions</h2>
        <button onClick={openNew} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">{editing ? 'Edit FAQ' : 'New FAQ'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <Input label="Question *" value={form.question} onChange={set('question')} placeholder="How long does it take?" />
            <TextArea label="Answer *" value={form.answer} onChange={set('answer')} rows={4} placeholder="It usually takes..." />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Category" value={form.category} onChange={set('category')} placeholder="General, Pricing, Support" />
              <Input label="Display Order" type="number" value={form.order} onChange={set('order')} />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={form.isVisible} onChange={e => setForm(p => ({ ...p, isVisible: e.target.checked }))} className="rounded bg-[#0a0a0f] border-white/20" />
              Visible on Public Website
            </label>
          </div>
          <div className="mt-5 flex gap-3 justify-end">
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-gray-400 hover:text-white text-sm font-medium">Cancel</button>
            <button onClick={handleSave} disabled={saving || !form.question || !form.answer} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <Card key={item._id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-white truncate">{item.question}</h4>
                <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-gray-400">{item.category}</span>
                {!item.isVisible && <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Hidden</span>}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.answer}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="text-center text-gray-500 py-10">No FAQs created yet.</p>}
      </div>
    </div>
  );
};
