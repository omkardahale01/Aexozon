import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const LightWaveSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress for a more cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Flowing movement based on scroll
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yPos = useTransform(smoothProgress, [0, 1], [80, -80]);
  const rotateX = useTransform(smoothProgress, [0, 1], [5, -5]);

  return (
    <section ref={containerRef} className="relative py-40 bg-premium-black overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-premium-gold/5 blur-[150px] rounded-full pointer-events-none" />

      {/* FULL WIDTH CONTINUOUS WAVE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden flex items-center justify-center w-full">
        <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#D6A85F" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#E6C98B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#B88A44" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D6A85F" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow-heavy" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Primary Glow Path */}
          <motion.path
            d="M 0,200 C 200,50 400,350 600,200 C 800,50 1000,350 1200,200"
            fill="none"
            stroke="url(#wave-gradient-1)"
            strokeWidth="6"
            filter="url(#glow-heavy)"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />

          {/* Secondary Layered Paths */}
          <motion.path
            d="M 0,220 C 300,100 500,300 600,220 C 700,140 900,340 1200,220"
            fill="none"
            stroke="url(#wave-gradient-2)"
            strokeWidth="2"
            opacity="0.6"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 0.5 }}
          />

          <motion.path
            d="M 0,180 C 150,250 450,150 600,180 C 750,210 1050,110 1200,180"
            fill="none"
            stroke="#E6C98B"
            strokeWidth="1"
            opacity="0.3"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 1 }}
          />
        </svg>
      </div>

      <motion.div
        style={{ y: yPos, opacity, rotateX }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6"
      >
        <div className="text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-premium-gold/20 bg-premium-gold/5 text-premium-gold text-xs font-bold tracking-[0.2em] uppercase mb-8"
          >
            Digital Craftsmanship
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-8"
          >
            Purpose Meets <br />
            <span className="gradient-text"> Precision </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-base md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We don't just build software; we engineer high-performance digital ecosystems
            designed to scale, impress, and deliver measurable business value.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};
