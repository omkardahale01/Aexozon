import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit3, Save, X, EyeOff, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Card = ({ children, className = '' }: any) => <div className={`bg-[#12121a] border border-white/5 rounded-2xl ${className}`}>{children}</div>;
const Input = ({ label, ...props }: any) => <div><label className="block text-sm text-gray-400 mb-1.5">{label}</label><input {...props} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors" /></div>;
const TextArea = ({ label, ...props }: any) => <div><label className="block text-sm text-gray-400 mb-1.5">{label}</label><textarea {...props} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors resize-none" /></div>;

const Button = ({ children, variant = 'primary', size = 'md', ...props }: any) => {
  const base = 'font-medium rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2.5 text-sm' };
  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20',
    ghost: 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
  };
  return <button {...props} className={`${base} ${sizes[size as keyof typeof sizes]} ${variants[variant as keyof typeof variants]}`}>{children}</button>;
};

const DeleteModal = ({ show, onConfirm, onCancel, itemName }: any) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-2">Confirm Delete</h3>
        <p className="text-gray-400 mb-6">Are you sure you want to delete <strong className="text-white">"{itemName}"</strong>? This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}><Trash2 className="w-4 h-4" /> Delete</Button>
        </div>
      </div>
    </div>
  );
};

export const ProjectsTab = ({ token, refreshData }: { token: string | null; refreshData: () => void }) => {
  const [projects, setProjects] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const blankProject = { title: '', subtitle: '', description: '', longDescription: '', technologies: '', image: '', githubUrl: '', liveUrl: '', features: '', category: 'Web Development', featured: false, isVisible: true };
  const [form, setForm] = useState(blankProject);

  const load = useCallback(async () => {
    const res = await fetch(`${API}/portfolio/projects`, { headers: { 'Authorization': `Bearer ${token}` }});
    const data = await res.json();
    if (data.success) setProjects(data.data);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blankProject); setEditing(null); setShowForm(true); };
  const openEdit = (p: any) => {
    setForm({
      title: p.title || '', subtitle: p.subtitle || '', description: p.description || '',
      longDescription: p.longDescription || '',
      technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : '',
      image: p.image || '', githubUrl: p.githubUrl || '', liveUrl: p.liveUrl || '',
      features: Array.isArray(p.features) ? p.features.join(', ') : '',
      category: p.category || 'Web Development',
      featured: p.featured || false,
      isVisible: p.isVisible !== false,
    });
    setEditing(p);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const body = {
      ...form,
      technologies: form.technologies.split(',').map((s: string) => s.trim()).filter(Boolean),
      features: form.features.split(',').map((s: string) => s.trim()).filter(Boolean),
    };
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API}/portfolio/projects/${editing._id}` : `${API}/portfolio/projects`;
    
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      toast.success(editing ? 'Project updated!' : 'Project created!');
      setShowForm(false);
      load();
      refreshData();
    } else toast.error('Failed to save project');
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch(`${API}/portfolio/projects/${deleteTarget.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }});
    const data = await res.json();
    if (data.success) { toast.success('Project deleted'); load(); refreshData(); }
    setDeleteTarget(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API}/upload`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData });
      const data = await res.json();
      if (data.success) { setForm(prev => ({ ...prev, image: data.url })); toast.success('Image uploaded!'); }
    } catch { toast.error('Upload failed'); }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="max-w-4xl space-y-4">
      <DeleteModal show={!!deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} itemName={deleteTarget?.name || ''} />

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">All Projects ({projects.length})</h2>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Add Project</Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-white">{editing ? 'Edit Project' : 'New Project'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title *" value={form.title} onChange={set('title')} placeholder="Project name" />
            <Input label="Subtitle" value={form.subtitle} onChange={set('subtitle')} placeholder="React | Node.js" />
            <Input label="Category" value={form.category} onChange={set('category')} placeholder="Web Development" />
            <Input label="GitHub URL" value={form.githubUrl} onChange={set('githubUrl')} placeholder="https://github.com/..." />
            <Input label="Live Demo URL" value={form.liveUrl} onChange={set('liveUrl')} placeholder="https://..." />
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Project Image</label>
              <div className="flex items-center gap-2">
                {form.image && <img src={form.image.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${form.image}` : form.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10" />}
                <label className="cursor-pointer px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 hover:bg-white/10 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <TextArea label="Description *" value={form.description} onChange={set('description')} rows={2} placeholder="Short description..." />
            <TextArea label="Long Description" value={form.longDescription} onChange={set('longDescription')} rows={3} placeholder="Detailed description..." />
            <Input label="Technologies (comma-separated)" value={form.technologies} onChange={set('technologies')} placeholder="React, Node.js, MongoDB" />
            <Input label="Features (comma-separated)" value={form.features} onChange={set('features')} placeholder="Auth, Dashboard, API" />
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded bg-[#0a0a0f] border-white/20" />
                Featured Project
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.isVisible} onChange={e => setForm(p => ({ ...p, isVisible: e.target.checked }))} className="rounded bg-[#0a0a0f] border-white/20" />
                Visible on Site
              </label>
            </div>
          </div>
          <div className="mt-5 flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !form.title}><Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}</Button>
          </div>
        </Card>
      )}

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((p: any) => (
          <Card key={p._id} className="p-4 flex items-center gap-4">
            {p.image && <img src={p.image.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${p.image}` : p.image} alt="" className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-white truncate">{p.title}</h4>
                {p.featured && <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/20">Featured</span>}
                {!p.isVisible && <EyeOff className="w-3.5 h-3.5 text-gray-500" />}
              </div>
              <p className="text-sm text-gray-500 truncate">{p.subtitle}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => setDeleteTarget({ id: p._id, name: p.title })} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </Card>
        ))}
        {projects.length === 0 && <p className="text-center text-gray-500 py-10">No projects yet. Click "Add Project" to get started.</p>}
      </div>
    </div>
  );
};
