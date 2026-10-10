import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowUp, MapPin, Instagram, Linkedin } from 'lucide-react';
import { SiBehance, SiPinterest } from 'react-icons/si';
import { AnimatedLogo } from '../ui/AnimatedLogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUpReveal, staggerCards, EASE } from '../../lib/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!footerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Brand col
      fadeUpReveal('.footer-brand', footerRef.current!, { start: 'top 90%', duration: 0.8 });

      // Nav columns staggered
      staggerCards('.footer-col', footerRef.current!, {
        stagger: 0.1,
        y: 30,
        start: 'top 90%',
        duration: 0.75,
      });

      // Bottom bar
      fadeUpReveal('.footer-bottom', footerRef.current!, { start: 'top 95%', y: 16, duration: 0.7, delay: 0.3 });

      // Separator line
      gsap.fromTo(
        '.footer-sep',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.1,
          ease: EASE.expo,
          scrollTrigger: { trigger: footerRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#F5F4F0] text-[#141412] pt-20 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-black/10"
    >
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/photos/portimg.png"
          alt="TechPlus Architectural Sunset Villa"
          className="absolute right-0 top-0 h-full w-full object-cover object-right-bottom opacity-45"
        />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#F5F4F0] via-[#F5F4F0]/95 to-[#F5F4F0]/70" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5F4F0] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F5F4F0] to-transparent" />
      </div>

      <div className="max-w-[1550px] mx-auto relative z-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 items-start">

          {/* Brand Info */}
          <div className="footer-brand lg:col-span-4 space-y-6" style={{ opacity: 0 }}>
            <Link to="/" className="inline-block transition-opacity hover:opacity-85">
              <AnimatedLogo isLight={false} />
            </Link>
            <p className="text-sm text-[#2A2A26] font-normal max-w-sm leading-relaxed">
              Architecture shaped around people, place and purpose. An international design atelier focused on contextual, sustainable and sensory environments.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-col lg:col-span-3 space-y-4 pt-2" style={{ opacity: 0 }}>
            <ul className="space-y-3 font-sans text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Studio', path: '/about' },
                { label: 'Selected Works', path: '/portfolio' },
                { label: 'Design Procedure', path: '/procedure' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-[#141412] hover:text-black transition-colors font-semibold text-sm"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-black" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="footer-col lg:col-span-3 space-y-4 pt-2" style={{ opacity: 0 }}>
            <div className="space-y-5 text-xs text-[#2A2A26]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-black font-bold text-sm">Techno + Associates</p>
                  <p className="text-[#3A3A35] font-medium leading-relaxed mt-1">
                    Munduparamba, Malappuram,<br />
                    Keralam 676509
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-col lg:col-span-2 space-y-4 pt-2" style={{ opacity: 0 }}>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
                { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
                { name: 'Behance', icon: SiBehance, url: 'https://behance.net' },
                { name: 'Pinterest', icon: SiPinterest, url: 'https://pinterest.com' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-[#141412] hover:text-black transition-colors inline-flex items-center gap-2 font-semibold text-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#141412] group-hover:text-black transition-colors" />
                      <span className="relative">
                        {social.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#141412] group-hover:text-black transition-colors opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="footer-sep h-[1px] w-full bg-black/15 mb-6" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }} />

        {/* Bottom Bar */}
        <div className="footer-bottom flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#141412] font-semibold gap-4" style={{ opacity: 0 }}>
          <span>&copy; 2026 TechPlus Architectural Studio. All rights reserved.</span>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-black hover:opacity-75 transition-opacity uppercase tracking-widest font-bold"
          >
            <span>BACK TO TOP</span>
            <div className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
