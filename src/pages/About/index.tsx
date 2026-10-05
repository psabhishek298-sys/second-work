import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';

function CounterNumber({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800; // ms
    const increment = target / (duration / 25);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white">
      {count}
      <span className="text-3xl sm:text-4xl text-[#A89F91]">{suffix}</span>
    </span>
  );
}

export const AboutPage: React.FC = () => {

  return (
    <PageTransition>
      <div className="bg-[#F5F4F0] text-[#141412] min-h-screen font-sans selection:bg-black selection:text-white">
        
        {/* ========================================================================= */}
        {/* HERO SECTION WITH ABOUTIMG.PNG BACKGROUND */}
        {/* ========================================================================= */}
        <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-32 sm:pt-40 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#F5F4F0]">
          {/* Background Image: aboutimg.png */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/photos/aboutimg.png"
              alt="TechPlus Architecture About Hero"
              className="absolute right-0 top-0 h-full w-full object-cover object-right-top"
            />
            {/* Left blend gradient */}
            <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-gradient-to-r from-[#F5F4F0] via-[#F5F4F0]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F4F0] to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 py-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest text-[#73736C] uppercase font-medium">
                  ABOUT US
                </span>
                <div className="h-[1px] w-12 bg-[#141412]/30" />
              </div>

              <div>
                <h1 className="font-display tracking-tight text-black text-6xl sm:text-7xl lg:text-8xl font-light leading-[0.95]">
                  <span className="font-city block mb-1 ">We design</span>
                  <span className="font-city text-[#8A8980] block">with purpose.</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#6E6E65] font-light max-w-md leading-relaxed">
                TECHPLUS is an international architecture and spatial design practice founded in 2011. We believe that physical spaces have the profound power to anchor memories, foster contemplation, and harmonize human lives with the natural elements.
              </p>

              <div className="pt-2">
                <a
                  href="#our-story"
                  className="inline-flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="font-mono text-xs tracking-widest uppercase text-black font-semibold">
                    OUR STORY
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column Elements: Vertical Tag & Numbers */}
            <div className="lg:col-span-6 h-full flex flex-col justify-between items-end relative py-6 pointer-events-none">
              <div className="hidden sm:flex flex-col items-end gap-2 text-[#484842] mt-4">
                <span className="font-mono text-[10px] tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 font-medium">
                  SPACES FOR A BETTER TOMORROW
                </span>
                <div className="h-12 w-[1px] bg-black/20" />
              </div>

              <div className="hidden sm:flex flex-col gap-1 font-mono text-[11px] text-[#484842] font-semibold self-end mt-auto">
                <span className="text-black">01</span>
                <span className="opacity-60">02</span>
                <span className="opacity-60">03</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR STORY SECTION */}
        {/* ========================================================================= */}
        <section id="our-story" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F5F4F0] border-t border-black/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest text-[#73736C] uppercase font-medium">
                  OUR STORY
                </span>
                <div className="h-[1px] w-12 bg-[#141412]/30" />
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.1] text-black">
                <span className="font-semibold block mb-1">Rooted in tradition</span>
                <span className="font-semibold block mb-1 text-[#8A8980] block">Executed with contemporary precision</span>
              </h2>

              <p className="text-sm sm:text-base text-[#6E6E65] font-light leading-relaxed max-w-xl">
                Founded in 2011, TechPlus is a multidisciplinary studio working across architecture, interiors, landscape, and spatial design. Our approach blends cultural context with modern thinking, creating spaces that are functional, sustainable and deeply human.
              </p>

              <div className="pt-4">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase font-semibold text-black hover:opacity-75 transition-opacity py-2 border-b border-black/20"
                >
                  LEARN MORE
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/photos/imgi_5_baner5.jpg"
                  alt="TechPlus Architectural Precision"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR IMPACT IN NUMBERS (DARK SECTION) */}
        {/* ========================================================================= */}
        <section className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#141412] text-white overflow-hidden">
          {/* Dark Architectural Backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/photos/imgi_8_baner4.jpg"
              alt="Backdrop"
              className="w-full h-full object-cover filter grayscale"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 space-y-16">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-[#A89F91] uppercase font-medium">
                OUR IMPACT IN NUMBERS
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-white/10 pt-12">
              {/* Stat 1 */}
              <div className="space-y-3 border-l border-white/10 pl-6">
                <CounterNumber target={15} suffix="+" />
                <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block">
                  YEARS OF DESIGN
                </span>
                <p className="text-xs text-neutral-400 font-light">Creating spaces since 2011</p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-3 border-l border-white/10 pl-6">
                <CounterNumber target={60} suffix="+" />
                <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block">
                  BUILT PROJECTS
                </span>
                <p className="text-xs text-neutral-400 font-light">Across residential, commercial and hospitality</p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-3 border-l border-white/10 pl-6">
                <CounterNumber target={12} suffix="+" />
                <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block">
                  CITIES
                </span>
                <p className="text-xs text-neutral-400 font-light">In India and internationally</p>
              </div>

              {/* Stat 4 */}
              <div className="space-y-3 border-l border-white/10 pl-6">
                <CounterNumber target={25} suffix="+" />
                <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block">
                  COLLABORATORS
                </span>
                <p className="text-xs text-neutral-400 font-light">Architects, designers and industry experts</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR FOUNDERS SECTION */}
        {/* ========================================================================= */}
        <section className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#F5F4F0]">
          <div className="max-w-6xl mx-auto space-y-16">
            
            {/* Top Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center justify-center gap-3">
                <span className="font-mono text-xs tracking-widest text-[#73736C] uppercase font-medium">
                  OUR FOUNDERS
                </span>
                <div className="h-[1px] w-12 bg-[#141412]/30" />
              </div>

              <h2 className="font-display tracking-tight text-black text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1]">
                <span className="font-semibold">The minds </span>
                <span className="font-semibold">behind </span>
                <span className="font-semibold text-[#8A8980]">the spaces.</span>
              </h2>
            </div>

            {/* Founder Cards (Centered Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 max-w-4xl mx-auto">
              
              {/* Founder 1 */}
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-61 h-61 sm:w-61 sm:h-61 rounded-xl overflow-hidden bg-neutral-200 shadow-xl border-4 border-white">
                  <img
                    src="/photos/imgi_4_project1.jpg"
                    alt="Ar. Rohan Varma"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="font-display text-2xl font-medium text-black">
                    Ar. Rohan Varma
                  </h3>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#73736C] block font-semibold">
                    FOUNDER &amp; PRINCIPAL ARCHITECT
                  </span>
                  <p className="text-xs sm:text-sm text-[#6E6E65] font-light leading-relaxed pt-1">
                    Rohan brings a deep appreciation for context, culture, and human experience into every space.
                  </p>
                </div>
              </div>

              {/* Founder 2 */}
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-61 h-61 sm:w-61 sm:h-61 rounded-xl overflow-hidden bg-neutral-200 shadow-xl border-4 border-white">
                  <img
                    src="/photos/imgi_10_project3.jpg"
                    alt="Maya Nair"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="font-display text-2xl font-medium text-black">
                    Maya Nair
                  </h3>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#73736C] block font-semibold">
                    FOUNDER &amp; CREATIVE DIRECTOR
                  </span>
                  <p className="text-xs sm:text-sm text-[#6E6E65] font-light leading-relaxed pt-1">
                    Maya leads the creative direction at TechPlus, focusing on innovative spatial solutions and sustainable design.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* PANORAMIC ARCHITECTURAL IMAGE BANNER */}
        {/* ========================================================================= */}
        <section className="w-full h-[60vh] sm:h-[75vh] relative overflow-hidden">
          <img
            src="/photos/image1.png"
            alt="TechPlus Architecture Villa"
            className="w-full h-full object-cover object-center"
          />
          
          <div className="absolute bottom-12 left-6 sm:left-10 lg:left-16 right-6 text-white max-w-4xl">
            <span className="font-mono text-xs tracking-widest text-white/70 uppercase block mb-2 font-semibold ">
              ARCHITECTURE &amp; SPATIAL EXCELLENCE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-white">
              Designing timeless spaces that inspire and endure.
            </h2>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
