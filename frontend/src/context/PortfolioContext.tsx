import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { personalInfo as fallbackPersonalInfo, professionalSummary as fallbackSummary, projects as fallbackProjects, experiences as fallbackExperiences, skillCategories as fallbackSkills, education as fallbackEducation } from '../data/portfolioData';
import type { Project, Experience, SkillCategory, Education, PortfolioInfo, SiteSettings } from '../types';

interface PortfolioContextType {
  portfolio: PortfolioInfo;
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
  education: Education[];
  settings: SiteSettings | null;
  loading: boolean;
  refreshData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultPortfolio: PortfolioInfo = {
  ...fallbackPersonalInfo,
  tagline: '',
  heroDescription: '',
  profileImage: '',
  professionalSummary: fallbackSummary,
  ctaButtons: [],
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioInfo>(defaultPortfolio);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperiences);
  const [skills, setSkills] = useState<SkillCategory[]>(fallbackSkills);
  const [education, setEducation] = useState<Education[]>(fallbackEducation);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/portfolio`);
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.portfolio) setPortfolio({ ...defaultPortfolio, ...json.data.portfolio });
        if (json.data.projects?.length > 0) setProjects(json.data.projects);
        if (json.data.experiences?.length > 0) setExperiences(json.data.experiences);
        if (json.data.skills?.length > 0) setSkills(json.data.skills);
        if (json.data.education?.length > 0) setEducation(json.data.education);
        if (json.data.settings) setSettings(json.data.settings);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio data, using fallback.', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PortfolioContext.Provider value={{ portfolio, projects, experiences, skills, education, settings, loading, refreshData: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
