import Contact from '../models/Contact.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';

export const getDashboardAnalytics = async (req, res) => {
  try {
    const totalLeads = await Contact.countDocuments();
    const newLeads = await Contact.countDocuments({ status: 'New' });
    
    // Group leads by source
    const leadsBySource = await Contact.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);

    const totalProjects = await Project.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    // Mock website visitors for now
    const websiteVisitors = 0; // In a real app, integrate with Google Analytics or a pageview tracker

    res.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        leadsBySource,
        totalProjects,
        totalServices,
        totalBlogs,
        websiteVisitors
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
