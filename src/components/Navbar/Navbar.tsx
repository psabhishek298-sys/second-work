import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import JellyRadio from '../ui/JellyRadio';
import { AnimatedLogo } from '../ui/AnimatedLogo';
import { gsap } from 'gsap';
import { EASE } from '../../lib/gsapAnimations';

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
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isDarkHeroPage = location.pathname === '/' || location.pathname.startsWith('/portfolio/');
  const isLightNav = !isScrolled && isDarkHeroPage;

  const currentPath =
    location.pathname === '/'
      ? '/'
      : NAV_ITEMS.find(it => it.path !== '/' && location.pathname.startsWith(it.path))?.path || '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Navbar entrance on mount
  useEffect(() => {
    if (!navRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.8, ease: EASE.expo, delay: 0.15 }
    );
  }, []);


  return (
    <>
      {/* Floating Navigation */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'py-3.5 px-6 sm:px-10 lg:px-16 text-black'
            : isLightNav
            ? 'py-6 px-6 sm:px-10 lg:px-16 text-white'
            : 'py-6 px-6 sm:px-10 lg:px-16 text-black'
        }`}
        style={{ opacity: 0 }} // will be set by GSAP
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <AnimatedLogo isLight={isLightNav} />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            <JellyRadio
              items={NAV_ITEMS.map(item => ({ value: item.path, label: item.label }))}
              value={currentPath}
              onChange={val => navigate(val)}
              chipColor={isLightNav ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.05)'}
              activeColor={isLightNav ? '#ffffff' : '#18181b'}
              textColor={isLightNav ? '#e4e4e7' : '#52525b'}
              activeTextColor={isLightNav ? '#18181b' : '#ffffff'}
              size="sm"
              gap={6}
              radius={18}
              swell={0.18}
              barge={5}
              stiffness={580}
              ariaLabel="Main Navigation"
            />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="flex items-center gap-2 p-2 focus:outline-none"
            >
              {/* Animated hamburger lines */}
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <span
                  className={`block h-[1.5px] w-full bg-current rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0E0E0C] text-white flex flex-col justify-between px-6 pt-28 pb-10 md:hidden overflow-hidden"
          >
            {/* Decorative large text in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="font-city text-[22vw] text-white/[0.03] whitespace-nowrap">TECHPLUS</span>
            </div>

            <nav className="flex flex-col gap-1 relative z-10">
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.15 + index * 0.07, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-baseline justify-between py-4 border-b border-white/10 ${
                        isActive ? 'text-white' : 'text-white/50 hover:text-white'
                      } transition-colors duration-200`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-white/30">{item.number}</span>
                        <span className="font-city text-4xl sm:text-5xl transition-transform duration-300 group-hover:translate-x-1">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className={`w-5 h-5 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xs font-mono text-white/40 pt-6 border-t border-white/10 flex justify-between relative z-10"
            >
              <span>TECHPLUS STUDIO</span>
              <span>hello@techplus.com</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
