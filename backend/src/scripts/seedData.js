import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Portfolio from '../models/Portfolio.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import SiteSettings from '../models/SiteSettings.js';

dotenv.config();

const personalInfo = {
  name: 'Santosh Khandagale',
  title: 'Driven Full Stack Developer',
  tagline: 'Available for opportunities',
  heroDescription: 'Building scalable web solutions with modern technologies',
  location: 'Kiwalegaon, Pune, India',
  phone: '+91 8999427831',
  email: 'skhandagle1233@gmail.com',
  photo: '/santosh-photo.png',
  resume: '/Santosh_khandagale_8999427831.pdf',
  profileImage: '',
  social: {
    linkedin: 'https://linkedin.com/in/santoshkhandagale',
    github: 'https://github.com/santoshkhandagale',
    twitter: 'https://twitter.com/santoshkhandagale',
  },
  professionalSummary: `Driven Full Stack Developer with specialized expertise in the MERN Stack and Java Full Stack development. Currently serving as a MERN Stack Intern at Worknai Technology India Pvt Ltd, focusing on building scalable HRMS and business automation systems. Proficient in Spring Boot, React.js, and Node.js with a strong foundation in OOPS, RESTful APIs, and modern AI productivity tools. Committed to delivering secure and high-performance web solutions.`,
  ctaButtons: [
    { label: 'View My Work', url: '/projects', type: 'primary' },
    { label: 'Download CV', url: '/Santosh_khandagale_8999427831.pdf', type: 'secondary' },
  ]
};

const experiences = [
  {
    company: 'Triblock Technology Private Limited',
    location: 'Mumbai, Maharashtra, India',
    role: 'Junior Software Engineer',
    duration: 'Mar 2026 - Present',
    responsibilities: [
      'Working on full-stack development, backend systems, API integration, database management, and scalable web application deployment.',
      'Focused on building secure, high-performance software solutions and delivering seamless user experiences.',
      'Utilizing Web Development, MERN Stack, and other modern technologies to meet business needs.'
    ],
    skillsUsed: ['Web Development', 'MERN Stack', 'API Integration', 'Database Management', 'Backend Systems'],
    order: 0,
  },
  {
    company: 'WorknAi Technologies India Pvt.Ltd',
    location: 'Pune, Maharashtra, India',
    role: 'Software Developer (Internship)',
    duration: 'Nov 2025 - Feb 2026',
    responsibilities: [
      'Frontend: Created interactive web pages using HTML5, CSS3, and JavaScript.',
      'Backend: Handled server-side logic and functionality using Java.',
      'Maintenance: Solved technical issues and updated existing applications.',
      'Teamwork: Worked closely with designers and other developers to meet project requirements.'
    ],
    skillsUsed: ['HTML5', 'CSS3', 'JavaScript', 'Java', 'Problem Solving'],
    order: 1,
  },
];

const projects = [
  {
    title: 'Business Expert Automation System',
    subtitle: 'MERN Stack',
    description: 'Built a business automation platform designed to centralize workflows, resulting in improved operational tracking and data management for clients.',
    longDescription: 'A comprehensive business automation platform that streamlines organizational workflows, automates repetitive tasks, and provides real-time analytics. The system features role-based access control, customizable workflow builders, and integration capabilities with popular business tools.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux', 'JWT Auth'],
    image: '/project-business-automation.jpg',
    githubUrl: 'https://github.com/santoshkhandagale/business-automation',
    features: ['Automated workflow management', 'Real-time data analytics dashboard', 'Role-based access control', 'Third-party integrations', 'Customizable reporting'],
    category: 'Web Development',
    featured: true,
    displayOrder: 0,
    isVisible: true,
  },
  {
    title: 'Smart Voting System',
    subtitle: 'Face Recognition | Java & AI',
    description: 'Developed a high-security voting application using Face Recognition for voter identity verification with encrypted storage protocols.',
    longDescription: 'An innovative voting system that leverages facial recognition technology to ensure secure and fraud-free elections.',
    technologies: ['Java', 'OpenCV', 'Face Recognition API', 'Spring Boot', 'MySQL', 'Encryption'],
    image: '/project-voting-system.jpg',
    githubUrl: 'https://github.com/santoshkhandagale/smart-voting',
    features: ['Facial recognition verification', 'One-person-one-vote integrity', 'End-to-end encryption', 'Real-time vote counting', 'Audit trail logging'],
    category: 'AI / ML',
    featured: false,
    displayOrder: 1,
    isVisible: true,
  },
  {
    title: 'Online Shopping System',
    subtitle: 'E-Commerce | Spring Boot & MySQL',
    description: 'Architected a full-stack e-commerce backend with Spring Boot and Hibernate for secure payment processing and inventory management.',
    longDescription: 'A robust e-commerce platform built with Spring Boot featuring secure payment gateways, comprehensive inventory management, order tracking, and customer analytics.',
    technologies: ['Spring Boot', 'Hibernate', 'MySQL', 'REST APIs', 'JWT', 'Stripe API'],
    image: '/project-ecommerce.jpg',
    githubUrl: 'https://github.com/santoshkhandagale/ecommerce-system',
    features: ['Secure payment processing', 'Inventory management', 'Order tracking system', 'Customer analytics', 'Multi-vendor support'],
    category: 'Web Development',
    featured: false,
    displayOrder: 2,
    isVisible: true,
  },
];

const skills = [
  {
    name: 'Frontend', icon: 'Layout', order: 0,
    skills: [
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'React.js', level: 85 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Responsive Design', level: 88 },
    ],
  },
  {
    name: 'Backend', icon: 'Server', order: 1,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'Java (Core)', level: 80 },
      { name: 'Spring Boot', level: 75 },
      { name: 'Hibernate (JPA)', level: 70 },
    ],
  },
  {
    name: 'Databases', icon: 'Database', order: 2,
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'JDBC', level: 75 },
    ],
  },
  {
    name: 'Tools & Concepts', icon: 'Wrench', order: 3,
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Maven', level: 75 },
      { name: 'RESTful APIs', level: 88 },
      { name: 'OOPS', level: 90 },
    ],
  },
];

const educationData = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'Sahakar Maharshi Shankarrao Mohite Patil Institute of Technology, Akluj',
    detail: 'Computer Science & Engineering | CGPA: 8.00/10.0',
    year: '2022 – 2025',
    order: 0,
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Government Polytechnic, Hingoli',
    detail: 'Percentage: 70%',
    year: '2019 – 2022',
    order: 1,
  },
];

const siteSettings = {
  seoTitle: 'Santosh Khandagale | Full Stack Developer Portfolio',
  seoDescription: 'Driven Full Stack Developer specializing in MERN Stack and Java. View my projects, skills, and experience.',
  seoKeywords: 'full stack developer, react, node.js, java, spring boot, portfolio, mern stack',
  ogImage: '',
  siteStatus: 'live',
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing
    await Portfolio.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await SiteSettings.deleteMany({});
    
    // Seed new
    await Portfolio.create(personalInfo);
    await Project.insertMany(projects);
    await Experience.insertMany(experiences);
    await Skill.insertMany(skills);
    await Education.insertMany(educationData);
    await SiteSettings.create(siteSettings);
    
    console.log('✅ Database seeded successfully with all sections!');
    console.log('   - Portfolio profile');
    console.log('   - 3 Projects');
    console.log('   - 1 Experience');
    console.log('   - 4 Skill categories');
    console.log('   - 2 Education entries');
    console.log('   - Site settings & SEO');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
