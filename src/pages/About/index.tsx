import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  fadeUpReveal,
  staggerCards,
  parallaxFloat,
  EASE,
} from '../../lib/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated counter ───────────────────────────────────────────
function CounterNumber({ target, suffix = '+', label, sub }: { target: number; suffix?: string; label: string; sub: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numRef.current || !wrapRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      numRef.current.textContent = String(target);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        onUpdate() {
          if (numRef.current) numRef.current.textContent = Math.round(obj.val).toString();
        },
      });

      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE.smooth,
          scrollTrigger: { trigger: wrapRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    });

    return () => ctx.revert();
  }, [target]);

  return (
    <div ref={wrapRef} className="space-y-3 border-l border-white/10 pl-6" style={{ opacity: 0 }}>
      <div className="font-display font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white">
        <span ref={numRef}>0</span>
        <span className="text-3xl sm:text-4xl text-[#A89F91]">{suffix}</span>
      </div>
      <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block">{label}</span>
      <p className="text-xs text-neutral-400 font-light">{sub}</p>
    </div>
  );
}

export const AboutPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // ─── Hero entrance ─────────────────────────────────────────
  useEffect(() => {
    if (!heroRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: EASE.expo } });

      tl.fromTo(
        '.about-label',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 },
        0
      )
        .fromTo(
          '.about-h1',
          { opacity: 0, y: 40, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 1 },
          0.2
        )
        .fromTo(
          '.about-sub',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.5
        )
        .fromTo(
          '.about-cta',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.7
        );

      // Parallax on hero image
      if (heroImgRef.current) {
        parallaxFloat(heroImgRef.current.querySelector('img'), heroImgRef.current, -8);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ─── Story section ──────────────────────────────────────────
  useEffect(() => {
    if (!storyRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      fadeUpReveal('.story-label', storyRef.current!, { start: 'top 85%', duration: 0.7 });
      fadeUpReveal('.story-heading', storyRef.current!, { start: 'top 82%', delay: 0.12, y: 40, duration: 1 });
      fadeUpReveal('.story-body', storyRef.current!, { start: 'top 80%', delay: 0.2, duration: 0.8 });
      fadeUpReveal('.story-cta', storyRef.current!, { start: 'top 78%', delay: 0.3, duration: 0.7 });

      // Story image reveal
      gsap.fromTo(
        '.story-img',
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.4,
          ease: EASE.expo,
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, storyRef);

    return () => ctx.revert();
  }, []);

  // ─── Founders section ──────────────────────────────────────
  useEffect(() => {
    if (!foundersRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      fadeUpReveal('.founders-header', foundersRef.current!, { start: 'top 85%', y: 30, duration: 0.9 });
      staggerCards('.founder-card', foundersRef.current!, { stagger: 0.18, y: 40, start: 'top 82%' });
    }, foundersRef);

    return () => ctx.revert();
  }, []);

  // ─── Banner parallax ────────────────────────────────────────
  useEffect(() => {
    if (!bannerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      parallaxFloat(bannerRef.current!.querySelector('img'), bannerRef.current!, -12);
      fadeUpReveal('.banner-content', bannerRef.current!, { start: 'top 75%', y: 30, duration: 0.9 });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <div className="bg-[#F5F4F0] text-[#141412] min-h-screen font-sans selection:bg-black selection:text-white">

        {/* ================================================================= */}
        {/* HERO SECTION */}
        {/* ================================================================= */}
        <section
          ref={heroRef}
          className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-32 sm:pt-40 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#F5F4F0]"
        >
          {/* Background Image with parallax */}
          <div ref={heroImgRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/photos/aboutimg.png"
              alt="TechPlus Architecture About Hero"
              className="absolute right-0 top-0 h-full w-full object-cover object-right-top"
            />
            <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-gradient-to-r from-[#F5F4F0] via-[#F5F4F0]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F4F0] to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
            <div className="lg:col-span-6 space-y-8 py-6">
              <div className="about-label flex items-center gap-3" style={{ opacity: 0 }}>
                <span className="font-mono text-xs tracking-widest text-[#73736C] uppercase font-medium">
                  ABOUT US
                </span>
                <div className="h-[1px] w-12 bg-[#141412]/30" />
              </div>

              <div className="about-h1" style={{ opacity: 0 }}>
                <h1 className="font-display tracking-tight text-black text-6xl sm:text-7xl lg:text-8xl font-light leading-[0.95]">
                  <span className="font-city block mb-1">We design</span>
                  <span className="font-city text-[#8A8980] block">with purpose.</span>
                </h1>
              </div>

              <p className="about-sub text-base sm:text-lg text-[#6E6E65] font-light max-w-md leading-relaxed" style={{ opacity: 0 }}>
                TECHPLUS is an international architecture and spatial design practice founded in 2011. We believe that physical spaces have the profound power to anchor memories, foster contemplation, and harmonize human lives with the natural elements.
              </p>

              <div className="about-cta pt-2" style={{ opacity: 0 }}>
                <a href="#our-story" className="inline-flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="font-mono text-xs tracking-widest uppercase text-black font-semibold">
                    OUR STORY
                  </span>
                </a>
              </div>
            </div>

            {/* Right: vertical label & numbers */}
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

        {/* ================================================================= */}
        {/* OUR STORY */}
        {/* ================================================================= */}
        <section
          id="our-story"
          ref={storyRef}
          className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F5F4F0] border-t border-black/10"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="story-label flex items-center gap-3" style={{ opacity: 0 }}>
                <span className="font-mono text-xs tracking-widest text-[#73736C] uppercase font-medium">
                  OUR STORY
                </span>
                <div className="h-[1px] w-12 bg-[#141412]/30" />
              </div>

              <h2 className="story-heading font-display text-4xl sm:text-5xl font-light leading-[1.1] text-black" style={{ opacity: 0 }}>
                <span className="font-semibold block mb-1">Rooted in tradition</span>
                <span className="font-semibold block mb-1 text-[#8A8980]">Executed with contemporary precision</span>
              </h2>

              <p className="story-body text-sm sm:text-base text-[#6E6E65] font-light leading-relaxed max-w-xl" style={{ opacity: 0 }}>
                Founded in 2011, TechPlus is a multidisciplinary studio working across architecture, interiors, landscape, and spatial design. Our approach blends cultural context with modern thinking, creating spaces that are functional, sustainable and deeply human.
              </p>

              <div className="story-cta pt-4" style={{ opacity: 0 }}>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase font-semibold text-black hover:opacity-75 transition-opacity py-2 border-b border-black/20"
                >
                  LEARN MORE
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-6">
              <div className="story-img relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11]" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
                <img
                  src="/photos/imgi_5_baner5.jpg"
                  alt="TechPlus Architectural Precision"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* IMPACT IN NUMBERS */}
        {/* ================================================================= */}
        <section className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#141412] text-white overflow-hidden">
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
              <CounterNumber target={15} suffix="+" label="YEARS OF DESIGN" sub="Creating spaces since 2011" />
              <CounterNumber target={60} suffix="+" label="BUILT PROJECTS" sub="Across residential, commercial and hospitality" />
              <CounterNumber target={12} suffix="+" label="CITIES" sub="In India and internationally" />
              <CounterNumber target={25} suffix="+" label="COLLABORATORS" sub="Architects, designers and industry experts" />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* FOUNDERS */}
        {/* ================================================================= */}
        <section
          ref={foundersRef}
          className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#F5F4F0]"
        >
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="founders-header text-center max-w-2xl mx-auto space-y-4" style={{ opacity: 0 }}>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 max-w-4xl mx-auto">
              {[
                {
                  img: '/photos/imgi_4_project1.jpg',
                  name: 'Ar. Rohan Varma',
                  role: 'FOUNDER & PRINCIPAL ARCHITECT',
                  bio: 'Rohan brings a deep appreciation for context, culture, and human experience into every space.',
                },
                {
                  img: '/photos/imgi_10_project3.jpg',
                  name: 'Maya Nair',
                  role: 'FOUNDER & CREATIVE DIRECTOR',
                  bio: 'Maya leads the creative direction at TechPlus, focusing on innovative spatial solutions and sustainable design.',
                },
              ].map((founder) => (
                <div
                  key={founder.name}
                  className="founder-card flex flex-col items-center text-center space-y-6 group"
                  style={{ opacity: 0 }}
                >
                  <div className="w-61 h-61 rounded-xl overflow-hidden bg-neutral-200 shadow-xl border-4 border-white">
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h3 className="font-display text-2xl font-medium text-black">{founder.name}</h3>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#73736C] block font-semibold">
                      {founder.role}
                    </span>
                    <p className="text-xs sm:text-sm text-[#6E6E65] font-light leading-relaxed pt-1">{founder.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* PANORAMIC BANNER */}
        {/* ================================================================= */}
        <section
          ref={bannerRef}
          className="w-full h-[60vh] sm:h-[75vh] relative overflow-hidden"
        >
          <img
            src="/photos/image1.png"
            alt="TechPlus Architecture Villa"
            className="w-full h-full object-cover object-center scale-110"
          />

          <div className="banner-content absolute bottom-12 left-6 sm:left-10 lg:left-16 right-6 text-white max-w-4xl" style={{ opacity: 0 }}>
            <span className="font-mono text-xs tracking-widest text-white/70 uppercase block mb-2 font-semibold">
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
