import React, { useState, useEffect } from 'react';
import { Users, Briefcase, FileText, Layout, ArrowUpRight } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#12121a] border border-white/5 rounded-2xl ${className}`}>{children}</div>
);

export const AnalyticsTab = ({ token }: { token: string | null }) => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/analytics`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) setStats(res.data);
      });
  }, [token]);

  if (!stats) return <div className="text-gray-400">Loading analytics...</div>;

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'from-cyan-400 to-blue-500' },
    { label: 'New Leads', value: stats.newLeads, icon: ArrowUpRight, color: 'from-green-400 to-emerald-500' },
    { label: 'Total Projects', value: stats.totalProjects, icon: Briefcase, color: 'from-purple-400 to-pink-500' },
    { label: 'Total Services', value: stats.totalServices, icon: Layout, color: 'from-orange-400 to-red-500' },
    { label: 'Published Blogs', value: stats.totalBlogs, icon: FileText, color: 'from-pink-400 to-rose-500' },
    { label: 'Website Visitors', value: stats.websiteVisitors, icon: Users, color: 'from-blue-400 to-indigo-500' },
  ];

  return (
    <div className="max-w-5xl space-y-6">
      <h2 className="text-2xl font-bold font-display text-white mb-6">Analytics Overview</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <Card key={c.label} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{c.label}</p>
                <h3 className="text-3xl font-bold text-white">{c.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Leads by Source</h3>
        <div className="space-y-4">
          {stats.leadsBySource.map((source: any) => (
            <div key={source._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span className="font-medium text-gray-200">{source._id || 'Unknown'}</span>
              <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
                {source.count} Leads
              </span>
            </div>
          ))}
          {stats.leadsBySource.length === 0 && (
            <p className="text-gray-500 text-sm">No leads data available yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
};
