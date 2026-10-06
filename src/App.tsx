import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Navbar } from './components/hero/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Services = React.lazy(() => import('./pages/Services'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Login = React.lazy(() => import('./pages/admin/Login'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { CursorGlow } from './components/ui/CursorGlow';
import { ReactLenis } from 'lenis/react';
import './App.css';

import AssistantWidget from './components/AssistantWidget';

// Simple fade transition
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
};

function MainContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');


  return (
    <div className="min-h-screen bg-premium-black text-white overflow-x-hidden">
      <ScrollToTop />
      <CursorGlow />
      {!isAdminRoute && <Navbar />}
      <main>
        <Suspense fallback={<div className="min-h-screen bg-premium-black flex items-center justify-center text-white/50">Loading...</div>}>
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && (
        <>
          <WhatsAppButton />
          <AssistantWidget />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <ReactLenis root>
          <Router>
            <MainContent />
          </Router>
        </ReactLenis>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
