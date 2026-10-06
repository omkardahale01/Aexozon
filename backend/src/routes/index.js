import express from 'express';
import contactRoutes from './contactRoutes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

import authRoutes from './authRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import chatRoutes from './chatRoutes.js';

import serviceRoutes from './serviceRoutes.js';
import blogRoutes from './blogRoutes.js';
import faqRoutes from './faqRoutes.js';
import teamRoutes from './teamRoutes.js';
import milestoneRoutes from './milestoneRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

// Contact routes
router.use('/contact', contactRoutes);

// Auth routes
router.use('/auth', authRoutes);

// Portfolio routes
router.use('/portfolio', portfolioRoutes);

// Upload routes
router.use('/upload', uploadRoutes);

// Chat routes
router.use('/chat', chatRoutes);

// New CMS routes
router.use('/services', serviceRoutes);
router.use('/blogs', blogRoutes);
router.use('/faqs', faqRoutes);
router.use('/team', teamRoutes);
router.use('/milestones', milestoneRoutes);
router.use('/analytics', analyticsRoutes);

// 404 handler
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

export default router;
