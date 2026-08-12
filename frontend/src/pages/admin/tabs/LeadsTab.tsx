import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Phone, ExternalLink, Calendar, Tag } from 'lucide-react';
import { toast } from 'sonner';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#12121a] border border-white/5 rounded-2xl ${className}`}>{children}</div>
);

export const LeadsTab = ({ token }: { token: string | null }) => {
  const [leads, setLeads] = useState<any[]>([]);
  const [filterSource, setFilterSource] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch(`${API}/contact?limit=100`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (e) {
      toast.error('Failed to load leads');
    }
  }, [token]);

  useEffect(() => { loadLeads(); }, [loadLeads]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API}/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Lead status updated to ${newStatus}`);
        loadLeads();
      }
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const filteredLeads = leads.filter(l => {
    if (filterSource !== 'All' && l.source !== filterSource) return false;
    if (filterStatus !== 'All' && l.status !== filterStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/20';
      case 'Contacted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'In Progress': return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
      case 'Converted': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'Closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-display text-white">Lead Management (CRM)</h2>
        <div className="flex gap-3">
          <select value={filterSource} onChange={e => setFilterSource(e.target.value)} className="bg-[#12121a] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400">
            <option value="All">All Sources</option>
            <option value="Website">Website Form</option>
            <option value="Chatbot">Chatbot</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-[#12121a] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400">
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLeads.map(lead => (
          <Card key={lead._id} className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                  <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-xs text-gray-300">
                    Via {lead.source || 'Website'}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Mail className="w-4 h-4" /> {lead.email}
                  </a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                      <Phone className="w-4 h-4" /> {lead.phone}
                    </a>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                  {lead.service && (
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Tag className="w-4 h-4" /> {lead.service}
                    </span>
                  )}
                </div>

                <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/5 mt-4 text-sm text-gray-300">
                  "{lead.message}"
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[160px]">
                <label className="text-xs text-gray-500 uppercase font-semibold">Change Status</label>
                <select 
                  value={lead.status} 
                  onChange={e => updateStatus(lead._id, e.target.value)}
                  className="bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
                
                {lead.phone && (
                  <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="mt-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 rounded-xl px-4 py-2.5 text-sm text-center flex items-center justify-center gap-2 transition-colors">
                    <ExternalLink className="w-4 h-4" /> WhatsApp Message
                  </a>
                )}
              </div>

            </div>
          </Card>
        ))}
        {filteredLeads.length === 0 && (
          <div className="text-center py-12 bg-[#12121a] rounded-2xl border border-white/5">
            <p className="text-gray-400">No leads found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
