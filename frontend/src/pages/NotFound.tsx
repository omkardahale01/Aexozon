import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-premium-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <motion.h1 
          className="text-8xl md:text-[150px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-2xl md:text-4xl font-semibold mb-6 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 mb-10 max-w-md mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
