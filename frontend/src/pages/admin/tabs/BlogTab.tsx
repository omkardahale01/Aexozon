import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit3, Save, X, FileText, Image as ImageIcon } from 'lucide-react';
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

export const BlogTab = ({ token }: { token: string | null }) => {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const blank = { title: '', slug: '', content: '', excerpt: '', author: 'AEXOZON Team', category: 'Technology', coverImage: '', seoTitle: '', seoKeywords: '', isPublished: false };
  const [form, setForm] = useState(blank);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/blogs`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (e) { toast.error('Failed to load blogs'); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(blank); setEditing(null); setShowForm(true); };
  const openEdit = (item: any) => {
    setForm({
      title: item.title, slug: item.slug, content: item.content, excerpt: item.excerpt,
      author: item.author, category: item.category, coverImage: item.coverImage,
      seoTitle: item.seoTitle, seoKeywords: item.seoKeywords, isPublished: item.isPublished
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = { ...form, publishedAt: form.isPublished && (!editing || !editing.isPublished) ? new Date() : (editing?.publishedAt || null) };
      const url = editing ? `${API}/blogs/${editing._id}` : `${API}/blogs`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? 'Blog updated!' : 'Blog created!');
        setShowForm(false);
        load();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch (e) { toast.error('Error saving blog'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`${API}/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) { toast.success('Deleted'); load(); }
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
        setForm(prev => ({ ...prev, coverImage: data.url }));
        toast.success('Image uploaded!');
      }
    } catch { toast.error('Upload failed'); }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setForm(prev => ({ ...prev, title, slug }));
  };

  return (
    <div className="max-w-5xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-display text-white">Blog & Content</h2>
        <button onClick={openNew} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-4">
            <h3 className="text-xl font-semibold text-white">{editing ? 'Edit Blog Post' : 'New Blog Post'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              <Input label="Post Title *" value={form.title} onChange={handleTitleChange} placeholder="The future of Web Development" />
              <Input label="Slug (URL Friendly) *" value={form.slug} onChange={set('slug')} placeholder="the-future-of-web-development" />
              <TextArea label="Short Excerpt" value={form.excerpt} onChange={set('excerpt')} rows={3} placeholder="A short summary of the post..." />
              
              <div>
                <label className="block text-sm text-gray-400 mb-1.5 flex justify-between">
                  <span>Main Content (Markdown/HTML Support) *</span>
                </label>
                <textarea 
                  value={form.content} onChange={set('content')} 
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors resize-y min-h-[300px] font-mono" 
                  placeholder="# Write your blog content here..."
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#0a0a0f] border border-white/5 p-5 rounded-xl space-y-4">
                <h4 className="font-medium text-white mb-2">Publishing details</h4>
                <Input label="Author" value={form.author} onChange={set('author')} />
                <Input label="Category" value={form.category} onChange={set('category')} />
                <label className="flex items-center gap-3 text-sm text-gray-200 cursor-pointer p-3 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors">
                  <input type="checkbox" checked={form.isPublished} onChange={e => setForm(p => ({ ...p, isPublished: e.target.checked }))} className="rounded w-4 h-4 bg-[#0a0a0f] border-white/20 text-cyan-500 focus:ring-cyan-500/50" />
                  <div className="flex flex-col">
                    <span className="font-medium">Publish Post</span>
                    <span className="text-xs text-gray-500">Make visible on the live site</span>
                  </div>
                </label>
              </div>

              <div className="bg-[#0a0a0f] border border-white/5 p-5 rounded-xl space-y-4">
                <h4 className="font-medium text-white mb-2">Cover Image</h4>
                {form.coverImage && (
                  <img src={form.coverImage.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${form.coverImage}` : form.coverImage} alt="Cover" className="w-full h-32 object-cover rounded-lg border border-white/10" />
                )}
                <label className="w-full cursor-pointer px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <ImageIcon className="w-4 h-4" /> {form.coverImage ? 'Change Image' : 'Upload Image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <div className="bg-[#0a0a0f] border border-white/5 p-5 rounded-xl space-y-4">
                <h4 className="font-medium text-white mb-2">SEO Meta Data</h4>
                <Input label="SEO Title" value={form.seoTitle} onChange={set('seoTitle')} placeholder="Optimized title" />
                <TextArea label="SEO Keywords" value={form.seoKeywords} onChange={set('seoKeywords')} rows={2} placeholder="tech, future, web, development" />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/5 flex gap-3 justify-end">
            <button onClick={() => setShowForm(false)} className="px-6 py-2.5 text-gray-400 hover:text-white text-sm font-medium">Cancel</button>
            <button onClick={handleSave} disabled={saving || !form.title || !form.content} className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map(item => (
          <Card key={item._id} className="flex flex-col overflow-hidden hover:border-cyan-500/30 transition-colors group">
            {item.coverImage && (
              <div className="h-32 w-full overflow-hidden border-b border-white/5">
                <img src={item.coverImage.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${item.coverImage}` : item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-gray-400 font-medium">{item.category}</span>
                {item.isPublished ? (
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium">Published</span>
                ) : (
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium">Draft</span>
                )}
              </div>
              <h4 className="font-semibold text-lg text-white mb-1 line-clamp-1">{item.title}</h4>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{item.excerpt}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">By {item.author}</span>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && <div className="col-span-full"><p className="text-center text-gray-500 py-10">No blog posts created yet.</p></div>}
      </div>
    </div>
  );
};
