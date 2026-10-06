import express from 'express';
import { 
  getPortfolioData, updatePortfolio, getStats,
  getProjects, createProject, updateProject, deleteProject,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getSkills, createSkill, updateSkill, deleteSkill,
  getEducation, createEducation, updateEducation, deleteEducation,
  getSiteSettings, updateSiteSettings
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getPortfolioData);

// Dashboard stats (protected)
router.get('/stats', protect, getStats);

// Profile (protected)
router.put('/profile', protect, updatePortfolio);

// Projects
router.get('/projects', protect, getProjects);
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Experience
router.get('/experience', protect, getExperiences);
router.post('/experience', protect, createExperience);
router.put('/experience/:id', protect, updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

// Skills
router.get('/skills', protect, getSkills);
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Education
router.get('/education', protect, getEducation);
router.post('/education', protect, createEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

// Site Settings / SEO
router.get('/settings', protect, getSiteSettings);
router.put('/settings', protect, updateSiteSettings);

export default router;
