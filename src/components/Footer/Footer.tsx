import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

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
    <footer className="bg-[#121210] text-white pt-14 sm:pt-18 pb-12 px-6 sm:px-10 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Studio Details & Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 text-sm">
          {/* Brand Manifesto */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-white" />
              <span className="font-mono text-sm tracking-[0.25em] font-bold text-white uppercase">
                TECHPLUS
              </span>
            </div>
            <p className="text-[#9B9B90] text-sm leading-relaxed max-w-sm font-sans">
              Architecture shaped around people, place and purpose. An international design atelier focused on contextual, sustainable and sensory environments.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#737370]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>STUDIO TIME (IST): {time || '18:30:00'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-widest text-[#737370] uppercase">EXPLORE</p>
            <ul className="space-y-2.5">
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
                    className="text-[#CACAC0] hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studios / Locations */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-widest text-[#737370] uppercase">STUDIOS</p>
            <div className="space-y-4 text-xs text-[#CACAC0]">
              <div>
                <p className="text-white font-medium">Kerala (HQ)</p>
                <p className="text-[#8C8C85]">Studio 04, Panampilly Nagar, Kochi</p>
              </div>
              <div>
                <p className="text-white font-medium">Bangalore</p>
                <p className="text-[#8C8C85]">The Mill, Indiranagar</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-widest text-[#737370] uppercase">CONNECT</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Instagram', url: 'https://instagram.com' },
                { name: 'LinkedIn', url: 'https://linkedin.com' },
                { name: 'Behance', url: 'https://behance.net' },
                { name: 'Pinterest', url: 'https://pinterest.com' },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#CACAC0] hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    {social.name}
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#737370]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Back to Top */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737370]">
          <div>
            &copy; 2026 TechPlus Architectural Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 hover:text-white transition-colors uppercase tracking-wider"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
