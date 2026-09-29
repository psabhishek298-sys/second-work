import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowUp, MapPin, Instagram, Linkedin } from 'lucide-react';
import { SiBehance, SiPinterest } from 'react-icons/si';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F5F4F0] text-[#141412] pt-20 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-black/10">
      {/* Background Image: portimg.png / Villa infinity pool */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/photos/portimg.png"
          alt="TechPlus Architectural Sunset Villa"
          className="absolute right-0 top-0 h-full w-full object-cover object-right-bottom opacity-45"
        />
        {/* Soft gradient fade overlay for maximum text readability */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#F5F4F0] via-[#F5F4F0]/95 to-[#F5F4F0]/70" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5F4F0] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F5F4F0] to-transparent" />
      </div>

      <div className="max-w-[1550px] mx-auto relative z-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-black/15 items-start">
          
          {/* Column 1: Brand Info & Live Studio Clock */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-black flex items-center justify-center font-mono text-xs font-bold text-black bg-white/80">
                +
              </div>
              <span className="font-display tracking-widest text-xl font-bold uppercase text-black">
                TECHPLUS
              </span>
            </div>

            <p className="text-sm text-[#2A2A26] font-normal max-w-sm leading-relaxed">
              Architecture shaped around people, place and purpose. An international design atelier focused on contextual, sustainable and sensory environments.
            </p>

            <div className="pt-2 flex items-center gap-3 font-mono text-xs text-[#141412] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-black/15 w-fit shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium">STUDIO TIME (IST)</span>
              <span className="text-black font-bold pl-2 border-l border-black/20">{time || '22:25:41'}</span>
            </div>
          </div>

          {/* Column 2: Explore Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#141412] uppercase block font-bold bg-white/60 backdrop-blur-sm px-3 py-1 rounded-md w-fit border border-black/10">
              EXPLORE
            </span>
            <ul className="space-y-3 font-sans text-sm pt-1">
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
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-black" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Studios / Locations */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#141412] uppercase block font-bold bg-white/60 backdrop-blur-sm px-3 py-1 rounded-md w-fit border border-black/10">
              STUDIOS
            </span>
            <div className="space-y-5 text-xs text-[#2A2A26] pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-black font-bold text-sm">Kerala (HQ)</p>
                  <p className="text-[#3A3A35] font-medium">Studio 04, Panampilly Nagar,<br />Kochi, India</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-black font-bold text-sm">Bangalore</p>
                  <p className="text-[#3A3A35] font-medium">The Mill, Indiranagar,<br />Bangalore, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Connect / Social */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#141412] uppercase block font-bold bg-white/60 backdrop-blur-sm px-3 py-1 rounded-md w-fit border border-black/10">
              CONNECT
            </span>
            <ul className="space-y-3 text-sm pt-1">
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
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#141412] group-hover:text-black transition-colors" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#141412] font-semibold gap-4">
          <span>&copy; 2026 TechPlus Architectural Studio. All rights reserved.</span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-black hover:opacity-75 transition-opacity uppercase tracking-widest font-bold"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
