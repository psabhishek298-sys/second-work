import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  number: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', path: '/', number: '01' },
  { label: 'ABOUT', path: '/about', number: '02' },
  { label: 'PORTFOLIO', path: '/portfolio', number: '03' },
  { label: 'PROCEDURE', path: '/procedure', number: '04' },
  { label: 'CONTACT', path: '/contact', number: '05' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isDarkHeroPage = location.pathname === '/' || location.pathname.startsWith('/portfolio/');
  const isLightNav = !isScrolled && isDarkHeroPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Transparent Floating Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-black/5 py-3.5 px-6 sm:px-10 lg:px-16 text-black'
            : isLightNav
            ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent py-6 px-6 sm:px-10 lg:px-16 text-white'
            : 'bg-transparent py-6 px-6 sm:px-10 lg:px-16 text-black'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className={`w-2.5 h-2.5 ${isLightNav ? 'bg-white' : 'bg-black'}`} />
            <span className="font-mono text-base tracking-[0.25em] font-bold uppercase">
              TECHPLUS
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                    isActive
                      ? isLightNav
                        ? 'text-white font-semibold'
                        : 'text-black font-semibold'
                      : isLightNav
                      ? 'text-white/80 hover:text-white'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                        isLightNav ? 'bg-white' : 'bg-black'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="flex items-center gap-2 p-2 focus:outline-none"
            >
              <span className="font-mono text-xs tracking-wider uppercase font-semibold">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white text-black flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          >
            <nav className="flex flex-col gap-4 my-auto">
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-baseline justify-between py-3 border-b border-neutral-100 ${
                        isActive ? 'text-black font-semibold' : 'text-neutral-600'
                      }`}
                    >
                      <span className="font-display text-3xl">{item.label}</span>
                      <ArrowUpRight className="w-5 h-5 text-neutral-400" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="text-xs font-mono text-neutral-500 pt-6 border-t border-neutral-100 flex justify-between">
              <span>TECHPLUS STUDIO</span>
              <span>hello@techplus.com</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
