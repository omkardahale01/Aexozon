import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { navItems } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { GridBackground } from './ui/GridBackground';

const Footer = () => {
  const { portfolio } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-premium-black border-t border-white/6 overflow-hidden">
      <GridBackground />
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-premium-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white tracking-tight">
                AEXOZON<span className="gradient-text">.</span>
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-xs">
              Transforming bold ideas into scalable digital products. We engineer enterprise-grade SaaS platforms, cloud architectures, and AI-powered solutions that drive real business growth.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: portfolio.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: portfolio.social.github, icon: Github, label: 'GitHub' },
                { href: portfolio.social.twitter, icon: Twitter, label: 'Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:border-white/20 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-white/80 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-5">Contact</h3>
            <ul className="space-y-3.5">
              <li>
                <a href={`mailto:${portfolio.email}`} className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm transition-colors">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="break-all">{portfolio.email}</span>
              </a>
              </li>
              <li>
              <a href="mailto:omkardahaleofficial@gmail.com" className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm transition-colors">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="break-all">omkardahaleofficial@gmail.com</span>
              </a>
              </li>
              <li>
              <a href={`tel:${portfolio.phone}`} className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm transition-colors">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                {portfolio.phone}
              </a>
              </li>
              <li>
              <a href="tel:+917030727201" className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm transition-colors">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                +91 7030727201
              </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/70 text-sm">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                {portfolio.location}
              </li>
              <li>
                <a
                  href="https://wa.me/918999427831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-premium-champagne/70 hover:text-premium-champagne text-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-5">Let's Connect</h3>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Got a project idea? Let's turn it into reality. Free consultation available.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-premium-gold to-premium-amber text-white text-sm font-semibold rounded-full transition-all hover:brightness-110 mb-4"
            >
              Get Free Quote
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-7 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs text-center sm:text-left flex items-center gap-1.5">
            © {new Date().getFullYear()} AEXOZON. Made with <Heart className="w-3 h-3 text-red-400/50" /> in Pune, India
            <span className="mx-2 text-white/90">·</span>
            <Link to="/admin/login" className="hover:text-white/80 transition-colors">Admin</Link>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
