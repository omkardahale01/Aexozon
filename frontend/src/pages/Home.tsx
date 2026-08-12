import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Code2,
  Star, Users, Zap, Globe, CheckCircle2
} from 'lucide-react';
import { BackgroundParticles } from '../components/3d/BackgroundParticles';
import { TiltCard } from '../components/ui/TiltCard';
import { CountUp } from '../components/ui/CountUp';
import { LightWaveSection } from '../components/ui/LightWaveSection';
import { services } from '../pages/Services';
import { projects } from '../data/portfolioData';
import { HeroSection } from '../components/hero/HeroSection';

const Home = () => {
  return (
    <div className="relative bg-premium-black">
      <HeroSection />



      {/* ═══════════ LIGHT WAVE SECTION ═══════════ */}
      <LightWaveSection />

      {/* ═══════════ BENTO SERVICES SECTION ═══════════ */}
      <section className="py-24 lg:py-32 bg-premium-black relative overflow-hidden">
        <div className="glow-orb glow-orb-purple w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14"
          >
            <div className="badge mx-auto mb-4">
              <Zap className="w-3.5 h-3.5" /> What I Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Strategic Digital <span className="gradient-text">Engineering</span>
            </h2>
            <p className="text-gray-300 text-sm max-w-lg mx-auto">
              From business websites to college projects, I provide end-to-end development services
              at student-friendly and startup-friendly prices.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <TiltCard className="bento-card p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                        <Icon className={`w-6 h-6 ${service.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                    </div>
                    <Link to="/services" className="inline-flex items-center gap-1.5 text-premium-gold text-xs font-medium mt-auto pt-4">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PROJECTS SECTION ═══════════ */}
      <section className="py-24 bg-premium-black relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Featured Projects
            </h2>
            <Link to="/projects" className="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bento-card overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-premium-black to-transparent z-10 opacity-60" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="badge-white px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs border border-white/20 rounded-full">
                      {project.subtitle}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-premium-gold transition-colors">{project.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-premium-gold text-xs font-medium mt-auto">
                      View Live Project <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link to="/projects" className="inline-flex items-center gap-1.5 text-premium-gold text-xs font-medium mt-auto">
                      View Project <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE ME — BENTO ═══════════ */}
      <section className="py-24 lg:py-32 bg-premium-black relative overflow-hidden">
        <div className="section-divider mb-24" />
        <div className="glow-orb glow-orb-pink w-[500px] h-[500px] -bottom-40 -right-40" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="badge mx-auto mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" /> Why Clients Choose Me
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              What Makes Me <span className="gradient-text">Different</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: 'Fast Delivery', desc: 'Projects delivered on time. No delays, no excuses. Your deadline is my priority.', color: 'from-premium-gold/20 to-premium-amber/20', iconColor: 'text-premium-gold' },
              { icon: Users, title: 'Budget Friendly', desc: 'Premium quality work at prices that fit student and startup budgets. No hidden costs.', color: 'from-premium-champagne/20 to-premium-gold/20', iconColor: 'text-premium-champagne' },
              { icon: Globe, title: 'Modern Tech Stack', desc: 'Using React, Node.js, MongoDB, Spring Boot, and the latest tools for best results.', color: 'from-premium-gold/20 to-premium-champagne/20', iconColor: 'text-premium-gold' },
              { icon: Star, title: '100% Support', desc: 'Post-delivery support, bug fixes, and guidance included. Your success matters to me.', color: 'from-premium-amber/20 to-premium-bronze/20', iconColor: 'text-premium-amber' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="h-full"
              >
                <TiltCard className="bento-card p-7 text-center h-full">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS SECTION ═══════════ */}
      <section className="py-20 bg-premium-black relative overflow-hidden">
        <BackgroundParticles />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="/section-bg.png" alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-premium-black/80" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 50, suffix: '+', label: 'Projects Delivered' },
              { value: 30, suffix: '+', label: 'Happy Clients' },
              { value: 99, suffix: '%', label: 'Client Satisfaction' },
              { value: 10, suffix: '+', label: 'Technologies Used' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bento-card p-6"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 stat-number gradient-text">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-300 text-xs font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TRUSTED CLIENTS — BENTO ═══════════ */}
      <section className="py-24 lg:py-32 bg-premium-black relative">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <div className="badge mb-4">
                <Code2 className="w-3.5 h-3.5" /> Trusted Clients
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Companies We've Delivered To
              </h2>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              We've partnered with ambitious startups and established enterprises to deliver high-impact digital solutions.
            </p>
          </motion.div>

          <div className="relative w-full overflow-hidden flex flex-col gap-4 group">
            <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-premium-black to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-premium-black to-transparent z-10 pointer-events-none" />
            
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
            >
              {[
                { name: 'Global Market Vision', type: 'Market Research', emoji: '🌐' },
                { name: 'FounderBean', type: 'Startup Platform', emoji: '☕' },
                { name: 'NexaBridge Solutions', type: 'Enterprise SaaS', emoji: '🔗' },
                { name: 'ClearStack Analytics', type: 'Data & Analytics', emoji: '📊' },
              ].map((client, idx) => (
                <TiltCard key={`${client.name}-1-${idx}`} className="w-64">
                  <div className="bento-card px-5 py-5 flex items-center gap-3">
                    <span className="text-xl">{client.emoji}</span>
                    <div>
                      <div className="text-xs text-white/70 uppercase tracking-wider font-medium">{client.type}</div>
                      <h3 className="font-semibold text-white text-sm">{client.name}</h3>
                    </div>
                  </div>
                </TiltCard>
              ))}
              {[
                { name: 'Global Market Vision', type: 'Market Research', emoji: '🌐' },
                { name: 'FounderBean', type: 'Startup Platform', emoji: '☕' },
                { name: 'NexaBridge Solutions', type: 'Enterprise SaaS', emoji: '🔗' },
                { name: 'ClearStack Analytics', type: 'Data & Analytics', emoji: '📊' },
              ].map((client, idx) => (
                <TiltCard key={`${client.name}-2-${idx}`} className="w-64">
                  <div className="bento-card px-5 py-5 flex items-center gap-3">
                    <span className="text-xl">{client.emoji}</span>
                    <div>
                      <div className="text-xs text-white/70 uppercase tracking-wider font-medium">{client.type}</div>
                      <h3 className="font-semibold text-white text-sm">{client.name}</h3>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="py-24 bg-premium-black relative overflow-hidden">
        <div className="glow-orb glow-orb-purple w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card p-10 md:p-16 text-center bg-gradient-to-br from-premium-gold/5 via-premium-amber/5 to-transparent"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-gray-300 text-base max-w-lg mx-auto mb-8">
              Whether it's a business website, mobile app, or college project — let's discuss your idea and turn it into reality. Free consultation available!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-premium-gold to-premium-amber text-white font-semibold text-sm rounded-full transition-all hover:brightness-110"
              >
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918999427831?text=Hello%20AEXOZON%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-medium text-sm rounded-full hover:border-white/30 hover:bg-white/5 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
