import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Shield, Zap, Globe } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const About = () => {
  return (
    <div className="min-h-screen bg-premium-black pt-28 pb-20 relative overflow-hidden font-sans">
      
      {/* Blurred Background Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0 pointer-events-none opacity-20 blur-[100px]">
        <img 
          src="/aexozon-logo.png" 
          alt="Background" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Header Section */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible" 
          custom={0} 
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6 backdrop-blur-md">
            <Globe className="w-4 h-4" /> Discover Aexozon
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Digital Future</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Aexozon is a forward-thinking digital engineering firm dedicated to transforming innovative ideas into robust, scalable, and beautifully designed tech solutions. We specialize in providing cutting-edge development services, enterprise architectures, and seamless integrations tailored for modern tech companies and ambitious startups.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Mission */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            animate="visible" 
            custom={1}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 transition-colors duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
              <Target className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To empower tech companies and ambitious enterprises through innovative digital engineering and scalable architectures. We strive to deliver premium, future-proof digital products that drive real-world business success and foster exponential growth in a rapidly evolving technology landscape.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            animate="visible" 
            custom={2}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 transition-colors duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/30">
              <Eye className="w-7 h-7 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To be a globally recognized leader in digital transformation, celebrated by industry pioneers for our unwavering commitment to engineering excellence, creative problem-solving, and making world-class enterprise technology accessible to startups and established corporations alike.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible" 
          custom={3}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Aexozon?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Innovation Driven</h3>
              <p className="text-sm text-gray-400">Leveraging the latest technologies to build future-proof solutions.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Client Centric</h3>
              <p className="text-sm text-gray-400">Your goals become our goals. We partner with you every step of the way.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-400">Uncompromising standards in every line of code and every lesson taught.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
