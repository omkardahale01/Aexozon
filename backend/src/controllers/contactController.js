import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';
import { sendAutoReplyEmail, sendAdminNotification } from '../services/emailService.js';

/**
 * Contact Controller
 * 
 * Handles all contact form related operations.
 */

// @desc    Submit a new contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      service: service || '',
      message,
      ipAddress: req.ip || (req.socket && req.socket.remoteAddress) || null,
      userAgent: req.headers['user-agent'],
    });

    // Save to database
    await contact.save();

    // Send emails asynchronously (don't block the response)
    sendAutoReplyEmail(email, name);
    sendAdminNotification(name, email, phone, service, message);

    res.status(201).json({
      success: true,
      message: 'Thank you for submitting your requirements. We will get back to you shortly.',
      data: {
        id: contact._id,
        name: contact.name,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private
export const getAllContacts = async (req, res) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Contact.countDocuments();
    const unread = await Contact.getUnreadCount();

    res.status(200).json({
      success: true,
      data: {
        total,
        unread,
        byStatus: stats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Update a contact's status or notes
// @route   PUT /api/contact/:id
// @access  Private
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  submitContact,
  getAllContacts,
  getContactStats,
  updateContact,
  deleteContact
};
