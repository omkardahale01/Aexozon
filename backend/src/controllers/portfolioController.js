import Portfolio from '../models/Portfolio.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import SiteSettings from '../models/SiteSettings.js';

// ─── GET ALL DATA (public) ───────────────────────────────────────────
export const getPortfolioData = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const projects = await Project.find({ isVisible: { $ne: false } }).sort({ displayOrder: 1, createdAt: -1 });
    const experiences = await Experience.find({ isVisible: { $ne: false } }).sort({ order: 1, createdAt: -1 });
    const skills = await Skill.find({ isVisible: { $ne: false } }).sort({ order: 1 });
    const education = await Education.find({ isVisible: { $ne: false } }).sort({ order: 1 });
    const settings = await SiteSettings.findOne();

    res.json({
      success: true,
      data: { portfolio, projects, experiences, skills, education, settings }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DASHBOARD STATS ─────────────────────────────────────────────────
export const getStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalSkills = await Skill.countDocuments();
    const totalExperiences = await Experience.countDocuments();
    const totalEducation = await Education.countDocuments();
    const settings = await SiteSettings.findOne();

    res.json({
      success: true,
      data: {
        totalProjects,
        totalSkills,
        totalExperiences,
        totalEducation,
        siteStatus: settings?.siteStatus || 'live',
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PORTFOLIO / PROFILE ─────────────────────────────────────────────
export const updatePortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(req.body);
      await portfolio.save();
    } else {
      portfolio = await Portfolio.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    }
    res.json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PROJECTS CRUD ───────────────────────────────────────────────────
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── EXPERIENCE CRUD ─────────────────────────────────────────────────
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: exp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: exp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, message: 'Experience removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── SKILLS CRUD ─────────────────────────────────────────────────────
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── EDUCATION CRUD ──────────────────────────────────────────────────
export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json({ success: true, data: edu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!edu) return res.status(404).json({ success: false, message: 'Education not found' });
    res.json({ success: true, data: edu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);
    if (!edu) return res.status(404).json({ success: false, message: 'Education not found' });
    res.json({ success: true, message: 'Education removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── SITE SETTINGS / SEO ────────────────────────────────────────────
export const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
      await settings.save();
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
