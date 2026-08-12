import { motion } from 'framer-motion';
import { Briefcase, MapPin, CheckCircle2, Code2, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { TiltCard } from '../components/ui/TiltCard';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as any }
  })
};

const Experience = () => {
  const { experiences } = usePortfolio();

  return (
    <div className="min-h-screen bg-premium-black pt-28 pb-20 relative overflow-hidden">
      {/* Background */}
      <div className="glow-orb glow-orb-purple w-[500px] h-[500px] top-1/4 -right-60" />
      <div className="glow-orb glow-orb-blue w-[400px] h-[400px] bottom-1/4 -left-40" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-14">
          <div className="badge mb-4">
            <Briefcase className="w-3.5 h-3.5" /> My Journey
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            Work <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-white/80 text-sm max-w-xl leading-relaxed">
            Building real-world applications and gaining hands-on experience in modern web development.
            Every project has been a learning milestone.
          </p>
        </motion.div>

        {/* ── STATS BENTO ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {[
            { icon: Briefcase, value: '2', label: 'Companies', color: 'from-indigo-500/20 to-blue-500/20', iconColor: 'text-premium-gold' },
            { icon: Code2, value: '20+', label: 'Projects Built', color: 'from-premium-amber/20 to-premium-bronze/20', iconColor: 'text-premium-amber' },
            { icon: TrendingUp, value: '99%', label: 'Satisfaction', color: 'from-premium-champagne/20 to-premium-gold/20', iconColor: 'text-premium-champagne' },
            { icon: Users, value: '10+', label: 'Team Collaborations', color: 'from-premium-bronze/20 to-premium-amber/20', iconColor: 'text-premium-amber' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.08 }}
              className="bento-card p-5 text-center"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className="text-2xl font-bold text-white stat-number">{stat.value}</div>
              <div className="text-white/70 text-xs font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── EXPERIENCE CARDS ── */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <TiltCard className="bento-card overflow-hidden">
                {/* Top gradient strip */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="p-7 md:p-9">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-premium-gold/20 to-premium-amber/20 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-premium-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl">{exp.role}</h3>
                      <p className="text-premium-gold text-sm font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <span className="badge text-xs">{exp.duration}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-white/70 mb-6">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs">{exp.location}</span>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 font-semibold text-white text-sm mb-4">
                    <Zap className="w-4 h-4 text-premium-gold" />
                    Key Contributions
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <motion.div
                        key={respIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: respIndex * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-premium-champagne flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm leading-relaxed">{resp}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-5 border-t border-white/6">
                  <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-3">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {(exp.skillsUsed || ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API', 'JWT']).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white/[0.04] border border-white/8 rounded-full text-xs text-white/80 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* ── CTA BENTO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bento-card p-8 md:p-10 bg-gradient-to-br from-indigo-500/5 to-transparent">
            <h2 className="text-2xl font-bold text-white mb-3">
              Want to See My Projects?
            </h2>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Check out the real-world applications I've built using these skills. From business tools to college projects — it's all there.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-premium-gold to-premium-amber text-white font-semibold text-sm rounded-full transition-all hover:brightness-110"
            >
              View Projects <Code2 className="w-4 h-4" />
            </Link>
          </div>

          <div className="bento-card p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              Let's Work Together
            </h2>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Looking for a dedicated developer for your next project? I'm just one message away. Free consultation for all project types.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white font-medium text-sm rounded-full hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              Contact Me <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
