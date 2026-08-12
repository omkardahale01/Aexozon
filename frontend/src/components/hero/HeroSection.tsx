import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// -----------------------------------------------------------------
// ShinyText Component
// -----------------------------------------------------------------
const ShinyText = ({ text }: { text: string }) => {
  return (
    <motion.span
      className="inline-block relative overflow-hidden"
      style={{
        // Define base and shine colors via CSS variables for the animation
        backgroundImage: `linear-gradient(100deg, #64CEFB 20%, #ffffff 50%, #64CEFB 80%)`,
        backgroundSize: '200% auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
      animate={{
        backgroundPosition: ['200% center', '-200% center']
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "linear"
      }}
    >
      {text}
    </motion.span>
  );
};

// -----------------------------------------------------------------
// Main Hero Section Component
// -----------------------------------------------------------------
export const HeroSection = () => {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4" type="video/mp4" />
      </video>

      {/* Optional dark overlay if video is too bright */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-32 pb-16">

        {/* Center Hero Section */}
        <div className="flex flex-col items-center justify-center text-center flex-1 mt-20">

          <h1 className="flex flex-col font-medium tracking-tighter mb-12 gap-4">
            <span className="text-white text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
              Build with Passion
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl mt-2 md:mt-4">
              <ShinyText text="Create with Purpose." />
            </span>
          </h1>

          <button className="group relative inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white rounded-full px-6 md:px-8 py-3 md:py-4 transition-colors font-medium">
            Apply for Next Enrollment
            <span className="bg-white/10 rounded-full p-1.5 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};
