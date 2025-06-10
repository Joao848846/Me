
import React, { useState, useEffect } from 'react';
import type { IconProps } from './Icons';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactElement<IconProps>;
}

interface HeaderProps {
  siteTitle: string;
  navItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ siteTitle, navItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-lg shadow-cyan-500/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="text-2xl font-bold tracking-tight">
            <span className="text-white hover:text-cyan-400 transition-colors">{siteTitle.split(' ')[0]}</span>
            <span className="text-cyan-400 hover:text-white transition-colors">{siteTitle.split(' ').slice(1).join(' ')}</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-cyan-600/30 hover:text-cyan-300 transition-all duration-200 ease-in-out flex items-center group"
              >
                {item.icon && React.cloneElement(item.icon, { className: "w-4 h-4 mr-2 text-cyan-500 group-hover:text-cyan-300 transition-colors" })}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 p-2 rounded-md"
              aria-label="Abrir menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-cyan-600/50 hover:text-cyan-300 transition-all duration-200 ease-in-out flex items-center group"
              >
                {item.icon && React.cloneElement(item.icon, { className: "w-5 h-5 mr-3 text-cyan-500 group-hover:text-cyan-300 transition-colors" })}
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
