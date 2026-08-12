import Milestone from '../models/Milestone.js';

export const getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find().sort({ order: 1 });
    res.json({ success: true, data: milestones });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.create(req.body);
    res.status(201).json({ success: true, data: milestone });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!milestone) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: milestone });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndDelete(req.params.id);
    if (!milestone) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
