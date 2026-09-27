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
    <footer className="bg-white text-black pt-8 sm:pt-10 pb-6 px-6 sm:px-10 lg:px-16 border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        {/* Studio Details & Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-8 border-b border-black/10 text-sm">
          {/* Brand Manifesto */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-black" />
              <span className="font-mono text-sm tracking-[0.25em] font-bold text-black uppercase">
                TECHPLUS
              </span>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-sm font-sans">
              Architecture shaped around people, place and purpose. An international design atelier focused on contextual, sustainable and sensory environments.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>STUDIO TIME (IST): {time || '18:30:00'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-widest text-neutral-400 font-semibold uppercase">EXPLORE</p>
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
                    className="text-neutral-700 hover:text-black transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studios / Locations */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-widest text-neutral-400 font-semibold uppercase">STUDIOS</p>
            <div className="space-y-4 text-xs text-neutral-700">
              <div>
                <p className="text-black font-medium">Kerala (HQ)</p>
                <p className="text-neutral-500">Studio 04, Panampilly Nagar, Kochi</p>
              </div>
              <div>
                <p className="text-black font-medium">Bangalore</p>
                <p className="text-neutral-500">The Mill, Indiranagar</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-widest text-neutral-400 font-semibold uppercase">CONNECT</p>
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
                    className="text-neutral-700 hover:text-black transition-colors inline-flex items-center gap-1.5"
                  >
                    {social.name}
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Back to Top */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <div>
            &copy; 2026 TechPlus Architectural Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 hover:text-black transition-colors uppercase tracking-wider"
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
