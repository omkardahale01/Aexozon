import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LogOut, Folder, FileText, LayoutDashboard, Settings, MessageSquare, Layout, HelpCircle, Users, Target, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Toaster } from 'sonner';

import { AnalyticsTab } from './tabs/AnalyticsTab';
import { GlobalSettingsTab } from './tabs/GlobalSettingsTab';
import { LeadsTab } from './tabs/LeadsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { BlogTab } from './tabs/BlogTab';
import { FAQTab } from './tabs/FAQTab';
import { TeamTab } from './tabs/TeamTab';
import { MilestoneTab } from './tabs/MilestoneTab';
import { ProjectsTab } from './tabs/ProjectsTab';

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const { portfolio, refreshData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('analytics');

  if (!user || !token) {
    return <Navigate to="/admin/login" />;
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
    { id: 'settings', label: 'Global Settings', icon: Settings },
    { id: 'leads', label: 'CRM Leads', icon: MessageSquare },
    { id: 'services', label: 'Services CMS', icon: Layout },
    { id: 'blogs', label: 'Blog & SEO CMS', icon: FileText },
    { id: 'faqs', label: 'FAQ CMS', icon: HelpCircle },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'projects', label: 'Projects', icon: Folder },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white" style={{ '--admin-primary': portfolio?.theme?.adminPrimaryColor || '#06b6d4' } as any}>
      <Toaster position="top-right" theme="dark" richColors />

      <div className="w-64 bg-[#12121a] border-r border-white/5 hidden lg:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold font-display gradient-text" style={{ backgroundImage: `linear-gradient(to right, ${portfolio?.theme?.adminPrimaryColor || '#06b6d4'}, #3b82f6)` }}>{portfolio?.siteName || 'Admin Panel'}</h2>
          <p className="text-xs text-gray-500 mt-1">Company CMS & CRM</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeTab === tab.id ? 'bg-white/10 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              style={activeTab === tab.id ? { color: portfolio?.theme?.adminPrimaryColor || '#06b6d4' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 flex-shrink-0 bg-[#12121a] border-b border-white/5 flex items-center justify-between px-4 lg:px-6">
          <div className="lg:hidden font-display gradient-text font-bold text-lg">{portfolio?.siteName || 'Admin'}</div>
          <h1 className="hidden lg:block text-lg font-semibold text-white">{tabs.find(t => t.id === activeTab)?.label}</h1>
          <div className="flex gap-4 items-center">
            <a href="/" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> View Site
            </a>
            <button onClick={handleLogout} className="lg:hidden text-sm text-red-400">Logout</button>
          </div>
        </header>

        <div className="lg:hidden flex overflow-x-auto gap-1 px-3 py-2 bg-[#0d0d15] border-b border-white/5 scrollbar-none">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === tab.id ? 'bg-white/10' : 'text-gray-500'}`} style={activeTab === tab.id ? { color: portfolio?.theme?.adminPrimaryColor || '#06b6d4' } : {}}>
              {tab.label}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 relative z-10">
          {activeTab === 'analytics' && <AnalyticsTab token={token} />}
          {activeTab === 'settings' && <GlobalSettingsTab token={token} portfolio={portfolio} refreshData={refreshData} />}
          {activeTab === 'leads' && <LeadsTab token={token} />}
          {activeTab === 'services' && <ServicesTab token={token} />}
          {activeTab === 'blogs' && <BlogTab token={token} />}
          {activeTab === 'faqs' && <FAQTab token={token} />}
          {activeTab === 'team' && <TeamTab token={token} />}
          {activeTab === 'milestones' && <MilestoneTab token={token} />}
          {activeTab === 'projects' && <ProjectsTab token={token} refreshData={refreshData} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
