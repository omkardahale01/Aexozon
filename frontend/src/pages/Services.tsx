import { motion } from 'framer-motion';
import {
  Layout, Server, ArrowRight, Smartphone,
  CheckCircle, Sparkles, Clock, Shield, Headphones, Wallet, Megaphone, Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TiltCard } from '../components/ui/TiltCard';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as any }
  })
};

export const services = [
  {
    id: 1,
    title: 'AI-Powered SaaS Architecture',
    icon: Sparkles,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-cyan-400',
    description: 'Build intelligent SaaS platforms with integrated generative AI, LLMs, and machine learning models tailored to modern business needs.',
    features: ['LLM Integration', 'Generative AI Workflows', 'Scalable Cloud Architecture', 'Multi-tenant Design', 'Predictive Analytics', 'API Monetization'],
    price: 'Custom Pricing',
  },
  {
    id: 2,
    title: 'Cloud Infrastructure & DevOps',
    icon: Cloud,
    color: 'from-premium-silver/20 to-premium-platinum/20',
    iconColor: 'text-premium-silver',
    description: 'Robust DevOps pipelines and cloud engineering using AWS, Azure, or GCP. Ensuring zero-downtime deployments and highly available infrastructure.',
    features: ['CI/CD Pipelines', 'Docker & Kubernetes', 'Infrastructure as Code', 'Serverless Architecture', 'Security & Compliance', '24/7 Monitoring'],
    price: 'Custom Pricing',
  },
  {
    id: 3,
    title: 'Enterprise CRM & ERP Systems',
    icon: Server,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    description: 'Custom Enterprise Resource Planning (ERP) and CRM tools to automate, streamline, and scale complex business operations efficiently.',
    features: ['Workflow Automation', 'Client Dashboards', 'Third-Party API Integrations', 'Supply Chain Management', 'Automated Invoicing', 'Real-time Reporting'],
    price: 'Custom Pricing',
  },
  {
    id: 4,
    title: 'Full Stack Web Applications',
    icon: Layout,
    color: 'from-indigo-500/20 to-blue-500/20',
    iconColor: 'text-blue-400',
    description: 'High-performance web applications built from scratch with modern frontend frameworks and robust backend microservices.',
    features: ['React & Next.js', 'Microservices Architecture', 'Database Design', 'Payment Integration', 'Real-Time WebSockets', 'High Security Standards'],
    price: 'Custom Pricing',
  },
  {
    id: 5,
    title: 'Cross-Platform Mobile Apps',
    icon: Smartphone,
    color: 'from-premium-steel/20 to-gray-700/20',
    iconColor: 'text-premium-steel',
    description: 'Engaging Android and iOS applications with clean design, smooth performance, and seamless backend integration.',
    features: ['React Native & Flutter', 'Push Notifications', 'Offline First Architecture', 'In-App Purchases', 'App Store Deployment', 'Post-Launch Support'],
    price: 'Custom Pricing',
  },
  {
    id: 6,
    title: 'Digital & Growth Marketing',
    icon: Megaphone,
    color: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
    description: 'Data-driven marketing campaigns, SEO optimization, and lead generation strategies to boost your SaaS product growth.',
    features: ['SEO & SEM', 'Social Media Marketing', 'Email Automation', 'B2B Lead Generation', 'Content Strategy', 'Conversion Rate Optimization'],
    price: 'Custom Pricing',
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-premium-black pt-28 pb-20 relative overflow-hidden">
      {/* Mountain Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none h-[70vh]">
        <img 
          src="/services-bg.jpg" 
          alt="Mountain Background" 
          className="w-full h-full object-cover object-[center_25%] opacity-50 mix-blend-screen transition-transform duration-1000 ease-in-out scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-premium-black/30 via-premium-black/70 to-premium-black" />
      </div>
      <div className="glow-orb glow-orb-purple w-[500px] h-[500px] -top-40 -right-40" />
      <div className="glow-orb glow-orb-blue w-[400px] h-[400px] bottom-0 -left-40" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <div className="badge mx-auto mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Our Services
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight"
          >
            Quality Work at <span className="gradient-text">Enterprise Scale</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/80 text-sm leading-relaxed"
          >
            We believe great technology should drive measurable business growth. That's why we offer
            premium-quality engineering services and scalable architectures for startups and global enterprises.
          </motion.p>
        </div>

        {/* ── BENTO SERVICES GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={index === 0 ? 'md:col-span-2 h-full' : 'h-full'}
              >
                <TiltCard className="bento-card p-7 md:p-8 h-full">
                <div className={`flex ${index === 0 ? 'flex-col md:flex-row gap-8' : 'flex-col gap-0'}`}>
                  <div className={index === 0 ? 'flex-shrink-0' : ''}>
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 w-[52px] h-[52px]`}>
                      <Icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-white">{service.title}</h3>
                      <span className="text-premium-platinum text-xs font-semibold bg-premium-platinum/10 px-3 py-1 rounded-full">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mb-5">{service.description}</p>

                    <div className={`grid ${index === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2 mb-5`}>
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/90 text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-premium-silver/60 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-premium-platinum text-xs font-medium hover:text-premium-silver transition-colors"
                    >
                      Get Started <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* ── WHY HIRE ME BENTO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Why Companies Trust Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Clock, title: 'On-Time Delivery', desc: 'We respect deadlines', color: 'text-premium-platinum' },
              { icon: Wallet, title: 'ROI Focused', desc: 'Scalable solutions', color: 'text-premium-silver' },
              { icon: Shield, title: 'Quality Code', desc: 'Clean & maintainable', color: 'text-premium-steel' },
              { icon: Headphones, title: 'Free Support', desc: 'After delivery help', color: 'text-premium-steel' },
            ].map((item) => (<div key={item.title} className="bento-card p-5 text-center">
                <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-3`} />
                <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-white/70 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── PROCESS STEPS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            How We Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Discussion', desc: 'We talk about your project idea, requirements, timeline, and business goals.' },
              { step: '02', title: 'Planning', desc: 'We create a clear architectural plan with milestones, tech stack, and scalability strategy.' },
              { step: '03', title: 'Development', desc: 'We build your product with regular updates, CI/CD pipelines, and transparent progress sharing.' },
              { step: '04', title: 'Delivery', desc: 'Final product delivery with documentation, source code, and long-term enterprise support.' },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bento-card p-6 relative"
              >
                <span className="text-4xl font-extrabold text-white/5 absolute top-3 right-4">{item.step}</span>
                <div className="relative z-10">
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bento-card p-10 md:p-14 text-center bg-gradient-to-br from-premium-platinum/5 via-premium-steel/5 to-transparent"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Have a Project in Mind? Let's Talk!
          </h2>
          <p className="text-white/80 text-sm max-w-lg mx-auto mb-7">
            Share your project idea and get a tailored proposal.
            Let's discuss how we can scale your business with modern tech.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-premium-platinum to-premium-steel text-white font-semibold text-sm rounded-full transition-all hover:brightness-110"
            >
              Get Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/918999427831?text=Hello%20AEXOZON%2C%20I%20visited%20your%20website%20and%20need%20a%20quote%20for%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white font-medium text-sm rounded-full hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              WhatsApp Me
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
