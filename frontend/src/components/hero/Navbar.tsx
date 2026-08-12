import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Blogs', path: '/blog' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/aexozon-logo.png" alt="Aexozon" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center bg-black/40 backdrop-blur-md border border-gray-700 rounded-full px-2 py-1.5">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/contact"
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium px-4 py-2 transition-colors group"
          >
            Contact us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-gray-900 border border-gray-700 rounded-2xl p-4 shadow-xl backdrop-blur-lg">
          <div className="flex flex-col gap-2">
            {[...navLinks, { name: 'Contact us', path: '/contact' }].map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="text-white/80 hover:text-white text-sm font-medium px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
