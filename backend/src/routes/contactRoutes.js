import express from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getAllContacts,
  getContactStats,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation rules for contact submission
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
];

// Routes
router.post('/', contactValidation, submitContact);
router.get('/', getAllContacts);
router.get('/stats', protect, getContactStats);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

export default router;
