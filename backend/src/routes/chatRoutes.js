import express from 'express';
import { sendMessage, getChatHistory, getAllSessions, getSessionMessages, resetSession } from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes for visitors
router.post('/message', sendMessage);
router.post('/reset', resetSession);
router.get('/history/:visitorId', getChatHistory);

// Protected routes for Admin Dashboard
router.get('/admin/sessions', protect, getAllSessions);
router.get('/admin/sessions/:sessionId/messages', protect, getSessionMessages);

export default router;
