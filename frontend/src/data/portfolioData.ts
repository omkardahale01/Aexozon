import type { Project, Experience, Education, Certification, SkillCategory, Achievement, Interest } from '../types';

export const personalInfo = {
  name: 'AEXOZON',
  title: 'Driven Full Stack Developer',
  location: 'Kiwalegaon, Pune, India',
  phone: '+91 8999427831',
  email: 'skhandagle1233@gmail.com',
  photo: '/aexozon-logo.png',
  resume: '/Santosh_khandagale_8999427831.pdf',
  social: {
    linkedin: 'https://linkedin.com/in/aexozon',
    github: 'https://github.com/aexozon',
    twitter: 'https://twitter.com/aexozon',
  }
};

export const professionalSummary = `Driven Full Stack Developer with specialized expertise in the MERN Stack and Java Full Stack development. Currently serving as a MERN Stack Intern at Worknai Technology India Pvt Ltd, focusing on building scalable HRMS and business automation systems. Proficient in Spring Boot, React.js, and Node.js with a strong foundation in OOPS, RESTful APIs, and modern AI productivity tools. Committed to delivering secure and high-performance web solutions.`;

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Triblock Technology Private Limited',
    location: 'Mumbai, Maharashtra, India',
    role: 'Junior Software Engineer',
    duration: 'Mar 2026 – Present',
    responsibilities: [
      'Working on full-stack development, backend systems, API integration, database management, and scalable web application deployment.',
      'Focused on building secure, high-performance software solutions and delivering seamless user experiences.',
      'Utilizing Web Development, MERN Stack, and other modern technologies to meet business needs.'
    ],
  },
  {
    id: 2,
    company: 'WorknAi Technologies India Pvt.Ltd',
    location: 'Pune, Maharashtra, India',
    role: 'Software Developer (Internship)',
    duration: 'Nov 2025 – Feb 2026',
    responsibilities: [
      'Frontend: Created interactive web pages using HTML5, CSS3, and JavaScript.',
      'Backend: Handled server-side logic and functionality using Java.',
      'Maintenance: Solved technical issues and updated existing applications.',
      'Teamwork: Worked closely with designers and other developers to meet project requirements.'
    ],
  },
];

export const education: Education[] = [
  {
    id: 1,
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'Sahakar Maharshi Shankarrao Mohite Patil Institute of Technology, Akluj',
    detail: 'Computer Science & Engineering | CGPA: 8.00/10.0',
    year: '2022 – 2025',
  },
  {
    id: 2,
    degree: 'Diploma in Computer Engineering',
    institution: 'Government Polytechnic, Hingoli',
    detail: 'Percentage: 70%',
    year: '2019 – 2022',
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    name: 'Java Full Stack Development',
    provider: 'Vibrant Mind Technology, Pune',
    year: '2025',
  },
];

export const projects: Project[] = [
  {
    id: 4,
    title: 'Smart HRMS Cloud',
    subtitle: 'HRMS | SaaS Platform',
    description: 'A cloud-based Human Resource Management System featuring employee management, attendance tracking, leave management, payroll processing, and real-time analytics dashboard.',
    longDescription: 'Smart HRMS is a comprehensive cloud-based HR Management platform designed to streamline every aspect of human resource operations. From employee onboarding and attendance tracking to payroll automation and performance analytics, Smart HRMS empowers organizations to manage their workforce efficiently with a modern, intuitive interface and powerful reporting tools.',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Redux', 'Chart.js', 'JWT Auth', 'Cloud Hosting'],
    image: '/project-smarthrms.png',
    liveUrl: 'https://www.smarthrms.cloud/',
    features: [
      'Employee management & onboarding',
      'Attendance tracking & reporting',
      'Leave management system',
      'Payroll processing & automation',
      'Real-time analytics dashboard',
      'Role-based access control',
    ],
    category: 'Web Development',
    featured: true,
  },
  {
    id: 1,
    title: 'Business Expert Automation System',
    subtitle: 'MERN Stack',
    description: 'Built a business automation platform designed to centralize workflows, resulting in improved operational tracking and data management for clients.',
    longDescription: 'A comprehensive business automation platform that streamlines organizational workflows, automates repetitive tasks, and provides real-time analytics. The system features role-based access control, customizable workflow builders, and integration capabilities with popular business tools.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux', 'JWT Auth'],
    image: '/project-business-automation.jpg',
    githubUrl: 'https://github.com/aexozon/business-automation',
    features: [
      'Automated workflow management',
      'Real-time data analytics dashboard',
      'Role-based access control',
      'Third-party integrations',
      'Customizable reporting',
    ],
  },
  {
    id: 2,
    title: 'Smart Voting System',
    subtitle: 'Face Recognition | Java & AI',
    description: 'Developed a high-security voting application using Face Recognition for voter identity verification with encrypted storage protocols.',
    longDescription: 'An innovative voting system that leverages facial recognition technology to ensure secure and fraud-free elections. The system uses advanced AI algorithms for face detection and verification, ensuring one-person-one-vote integrity with end-to-end encryption.',
    technologies: ['Java', 'OpenCV', 'Face Recognition API', 'Spring Boot', 'MySQL', 'Encryption'],
    image: '/project-voting-system.jpg',
    githubUrl: 'https://github.com/aexozon/smart-voting',
    features: [
      'Facial recognition verification',
      'One-person-one-vote integrity',
      'End-to-end encryption',
      'Real-time vote counting',
      'Audit trail logging',
    ],
  },
  {
    id: 3,
    title: 'Online Shopping System',
    subtitle: 'E-Commerce | Spring Boot & MySQL',
    description: 'Architected a full-stack e-commerce backend with Spring Boot and Hibernate for secure payment processing and inventory management.',
    longDescription: 'A robust e-commerce platform built with Spring Boot featuring secure payment gateways, comprehensive inventory management, order tracking, and customer analytics. The system handles high traffic loads with optimized database queries and caching mechanisms.',
    technologies: ['Spring Boot', 'Hibernate', 'MySQL', 'REST APIs', 'JWT', 'Stripe API'],
    image: '/project-ecommerce.jpg',
    githubUrl: 'https://github.com/aexozon/ecommerce-system',
    features: [
      'Secure payment processing',
      'Inventory management',
      'Order tracking system',
      'Customer analytics',
      'Multi-vendor support',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'React.js', level: 85 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Responsive Design', level: 88 },
    ],
  },
  {
    id: 2,
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'Java (Core)', level: 80 },
      { name: 'Spring Boot', level: 75 },
      { name: 'Hibernate (JPA)', level: 70 },
    ],
  },
  {
    id: 3,
    name: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'JDBC', level: 75 },
    ],
  },
  {
    id: 4,
    name: 'Tools & Concepts',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Maven', level: 75 },
      { name: 'RESTful APIs', level: 88 },
      { name: 'OOPS', level: 90 },
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Sports Excellence',
    description: 'Winner: Inter-college cricket tournament representing Government Polytechnic Hingoli',
    icon: 'Trophy',
  },
  {
    id: 2,
    title: 'Technical Certification',
    description: 'Completed Java Full Stack Development certification from Vibrant Mind Technology',
    icon: 'Award',
  },
  {
    id: 3,
    title: 'Academic Achievement',
    description: 'Maintained CGPA of 8.00/10.0 in B.Tech Computer Science & Engineering',
    icon: 'GraduationCap',
  },
];

export const interests: Interest[] = [
  {
    id: 1,
    name: 'AI Exploration',
    icon: 'Brain',
    description: 'Exploring emerging AI technologies and machine learning applications',
  },
  {
    id: 2,
    name: 'Technical Blogging',
    icon: 'PenTool',
    description: 'Writing articles about web development and programming best practices',
  },
  {
    id: 3,
    name: 'Travelling',
    icon: 'Plane',
    description: 'Exploring new places and experiencing different cultures',
  },
  {
    id: 4,
    name: 'Cricket',
    icon: 'Target',
    description: 'Passionate about cricket and team sports',
  },
];

export const navItems = [
  { label: 'Home', path: '/', icon: 'Home' },
  { label: 'About', path: '/about', icon: 'User' },
  { label: 'Experience', path: '/experience', icon: 'Briefcase' },
  { label: 'Services', path: '/services', icon: 'Settings' },
  { label: 'Projects', path: '/projects', icon: 'Folder' },
  { label: 'Contact', path: '/contact', icon: 'Mail' },
];
