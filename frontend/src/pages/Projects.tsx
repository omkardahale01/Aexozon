import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Layers, Code2, Database, ArrowRight, Sparkles, Folder } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { BackgroundParticles } from '../components/3d/BackgroundParticles';
import { TiltCard } from '../components/ui/TiltCard';
import type { Project } from '../types';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as any }
  })
};

const Projects = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-premium-black pt-28 pb-20 relative overflow-hidden">
      <BackgroundParticles />
      <div className="glow-orb glow-orb-purple w-[500px] h-[500px] top-1/4 -left-60" />
      <div className="glow-orb glow-orb-blue w-[400px] h-[400px] bottom-1/4 -right-40" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-14">
          <div className="badge mb-4">
            <Folder className="w-3.5 h-3.5" /> My Work
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-white/80 text-sm max-w-xl leading-relaxed">
            Here are some of the projects I've built for clients, businesses, and as part of my learning journey.
            Each project is built with care, clean code, and attention to detail.
          </p>
        </motion.div>

        {/* ── BENTO PROJECTS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              onClick={() => setSelectedProject(project)}
              className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <TiltCard className="cursor-pointer bento-card group h-full">
              {/* Image */}
              <div className={`relative ${index === 0 ? 'h-56 md:h-64' : 'h-44'} bg-[#0a0a0a] overflow-hidden`}>
                <img
                  src={project.image?.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${project.image}` : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-500 group-hover:scale-[1.03] transition-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/30 to-transparent" />

                {/* Project Number */}
                <div className="absolute top-4 left-5">
                  <span className="text-3xl font-extrabold text-white/90 group-hover:text-white/60 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* View Badge */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="badge text-xs px-3 py-1.5">
                    <Sparkles className="w-3 h-3" /> View Details
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-premium-gold" />
                  <span className="text-premium-gold/70 text-xs uppercase tracking-wider font-medium">
                    {project.subtitle}
                  </span>
                </div>

                <h3 className="font-bold text-white text-[17px] mb-2 group-hover:text-white/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, index === 0 ? 6 : 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white/[0.04] border border-white/6 text-xs text-white/80 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > (index === 0 ? 6 : 4) && (
                    <span className="px-2.5 py-1 bg-premium-gold/10 border border-premium-gold/20 text-xs text-premium-gold rounded-full font-medium">
                      +{project.technologies.length - (index === 0 ? 6 : 4)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-white/70 border-t border-white/6 pt-3">
                  <span>Click to explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bento-card p-8 md:p-12 text-center bg-gradient-to-br from-indigo-500/5 to-transparent"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Need Something Similar?
          </h2>
          <p className="text-white/80 text-sm max-w-lg mx-auto mb-6">
            I can build a project like these for your business or college. Let's discuss your requirements and get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-premium-gold to-premium-amber text-white font-semibold text-sm rounded-full transition-all hover:brightness-110"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white font-medium text-sm rounded-full hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              View Services
            </Link>
          </div>
        </motion.div>

        {/* ── PROJECT DETAIL MODAL ── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bento-card"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-2/5 relative h-56 md:h-auto bg-[#050505]">
                    <img
                      src={selectedProject.image?.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${selectedProject.image}` : selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080808] to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-3/5 p-7 md:p-10">
                    <div className="mb-7">
                      <div className="badge text-xs mb-3">{selectedProject.subtitle}</div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-5">
                        {selectedProject.title}
                      </h2>
                      <div className="flex gap-3 flex-wrap">
                        {selectedProject.githubUrl && (
                          <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white text-xs font-medium rounded-full hover:border-white/25 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" /> Source Code
                          </a>
                        )}
                        {selectedProject.liveUrl && (
                          <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-premium-gold to-premium-amber text-white text-xs font-semibold rounded-full"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="flex items-center gap-2 font-medium text-white text-sm mb-3">
                        <Layers className="w-4 h-4 text-white/70" /> About This Project
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    {selectedProject.features && (
                      <div className="mb-6">
                        <h3 className="flex items-center gap-2 font-medium text-white text-sm mb-3">
                          <Code2 className="w-4 h-4 text-white/70" /> Key Features
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {selectedProject.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/80 text-xs">
                              <div className="w-1.5 h-1.5 bg-premium-gold rounded-full flex-shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="flex items-center gap-2 font-medium text-white text-sm mb-3">
                        <Database className="w-4 h-4 text-white/70" /> Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((t) => (
                          <span key={t} className="px-3 py-1.5 bg-white/[0.04] border border-white/8 text-white/80 text-xs rounded-full font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
