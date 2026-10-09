import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { SiSupabase, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVercel } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { MagneticButton } from '../../components/MagneticButton/MagneticButton';
import { RevealImage } from '../../components/RevealImage/RevealImage';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { Testimonials } from '../../components/Testimonials/Testimonials';
import { LogoLoop } from '../../components/ui/LogoLoop';
import ScrollExpand from '../../components/ui/ScrollExpand';
import { api } from '../../services/api';
import { Project } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const clipSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Clip path animation like fluid.glass/approach: reveals from bottom to top
  const clipPathVal = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
  );

  useEffect(() => {
    // Fetch featured projects
    api.getProjects(undefined, true).then((projects) => {
      setFeaturedProjects(projects.slice(0, 4));
    });
  }, []);

  // GSAP ScrollTrigger statement animation
  useEffect(() => {
    if (!statementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.statement-word',
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.8,
          },
        }
      );
    }, statementRef);

    return () => ctx.revert();
  }, []);


  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO SECTION (fluid.glass/approach style sticky clip-path scroll reveal) */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative h-[250vh] w-full bg-black"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Base First Image: pcherp1.png */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/photos/pcherp1.png"
              alt="TechPlus Architecture Hero Initial"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Overlapping Second Image: pchero.jpg with clip-path reveal from bottom */}
          <motion.div
            style={{ clipPath: clipPathVal }}
            className="absolute inset-0 w-full h-full z-10"
          >
            <img
              src="/photos/pchero.jpg"
              alt="TechPlus Architecture Hero Reveal"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: SCROLL STATEMENT (GSAP ScrollTrigger animated) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SECTION 1: SCROLL STATEMENT (GSAP ScrollTrigger animated) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SECTION 1: MANIFESTO (Matching provided mockup design) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SECTION 1: MANIFESTO (Matching precise mockup design in image) */}
      {/* ========================================================================= */}
      <section
        ref={statementRef}
        className="py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-white text-[#141412] border-b border-black/5 overflow-hidden"
      >
        <div className="max-w-[1550px] mx-auto">
          {/* Main Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
            {/* Left Column: Manifesto Text & Action */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-12 bg-black/20" />
              </div>

              <h2 className="font-city text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.08] tracking-tight text-[#1a1a18] mb-8">
                We believe <br />
                <span className="text-[#a38361] font-normal font-city">great architecture</span> <br />
                is experienced, <br />
                not just seen.
              </h2>

              <p className="text-xs sm:text-sm text-[#66665c] leading-relaxed max-w-md mb-10 ">
                Spaces shaped by context, crafted with natural materials, and designed for a better tomorrow.
              </p>

              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center group-hover:bg-[#1a1a18] group-hover:border-[#1a1a18] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                  <span className=" text-[11px] tracking-widest text-[#1a1a18] uppercase font-medium group-hover:text-[#a38361] transition-colors duration-300">
                    DISCOVER OUR STUDIO
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Architectural House Image with top-left arch corner & white left fade */}
            <div className="lg:col-span-6 relative">
              {/* Top-left Arc Curve stroke line */}
              <svg
                className="absolute -top-10 -left-10 w-44 h-44 pointer-events-none hidden sm:block z-0"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M 95 5 C 35 5, 5 35, 5 95"
                  stroke="#1a1a18"
                  strokeWidth="0.6"
                  strokeOpacity="0.2"
                  fill="none"
                />
              </svg>

              {/* Main Image Container Card with white left fade gradient */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-tl-[160px] sm:rounded-tl-[220px] rounded-br-[32px] rounded-tr-[24px] rounded-bl-[24px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] bg-white group">
                <img
                  src="/photos/imgi_10_baner8.jpg"
                  alt="Great Architecture Experienced"
                  className="w-full h-full object-cover object-right transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Smooth white gradient mask on the left */}
                <div className="absolute inset-y-0 left-0 w-3/5 sm:w-7/12 bg-gradient-to-r from-white via-white/90 via-white/60 to-transparent z-10 pointer-events-none" />

                {/* Bottom right slide indicator */}
                <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2 font-mono text-xs text-white/90 drop-shadow bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  <div className="h-[2px] w-5 bg-white" />
                  <span>01 / 03</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Columns Feature Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-10 border-t border-black/10">
            <div className="md:pr-6 md:border-r border-black/10">
              <p className=" text-xs tracking-widest text-[#1a1a18] font-semibold uppercase mb-3">
                01. CONTEXTUALITY
              </p>
              <p className="text-xs sm:text-sm text-[#66665c] leading-relaxed">
                Rooted in local geography, sunlight angles, climate patterns, and native building traditions.
              </p>
            </div>

            <div className="md:px-6 md:border-r border-black/10">
              <p className=" text-xs tracking-widest text-[#1a1a18] font-semibold uppercase mb-3">
                02. MATERIAL HONESTY
              </p>
              <p className="text-xs sm:text-sm text-[#66665c] leading-relaxed">
                Raw, warm and earth, exposed tactile concrete, reclaimed timber, and unvarnished natural stone.
              </p>
            </div>

            <div className="md:pl-6">
              <p className=" text-xs tracking-widest text-[#1a1a18] font-semibold uppercase mb-3">
                03. HUMAN WELL-BEING
              </p>
              <p className="text-xs sm:text-sm text-[#66665c] leading-relaxed">
                Spatial harmony, acoustics, and air quality calibrated to elevate psychological and sensory tranquility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: EDITORIAL PARALLAX / CLIP-PATH IMAGE STORY */}
      {/* ========================================================================= */}
      <section
        ref={clipSectionRef}
        className="py-24 sm:py-36 px-8 sm:px-12 lg:px-20 bg-white text-[#141412] border-b border-black/5 relative overflow-hidden"
      >
        <div className="max-w-[1550px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with clip path */}
          <div className="lg:col-span-7">
            <div className="relative group">
              <RevealImage
                src="/photos/imgi_5_baner5.jpg"
                alt="Architectural Materiality and Form"
                aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                clipReveal={true}
              />
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-white p-6 rounded-xl border border-black/10 max-w-xs shadow-xl">
                <span className=" text-[10px] tracking-widest text-[#9B9B90] uppercase block mb-1">
                  SPATIAL PURITY
                </span>
                <p className="text-xs text-[#484842]  leading-relaxed">
                  "Every plane and shadow must have intention. When unnecessary ornament is shed, pure space emerges."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className=" text-xs tracking-widest text-[#9B9B90] uppercase block">
              02 / DESIGN PHILOSOPHY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-normal leading-[1.1] tracking-tight text-[#141412]">
              Spaces that breathe with light, rain and shadow.
            </h2>
            <p className="text-sm sm:text-base text-[#6E6E65] font-light leading-relaxed">
              We approach each architectural project not as an isolated monument, but as an open dialogue between the land, the atmosphere, and the human inhabitant.
            </p>
            <p className="text-sm text-[#9B9B90] leading-relaxed">
              From tropical residences in Kerala to commercial urban pavilions in Bangalore, our work balances structural precision with tactile materiality.
            </p>

            <div className="pt-4">
              <MagneticButton strength={0.25}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#141412] uppercase hover:text-black transition-colors py-2 border-b border-black/20"
                >
                  DISCOVER THE STUDIO
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCROLL EXPAND SECTION */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white">
        <ScrollExpand
          src="/photos/image2.png"
          alt="Architectural Excellence"
          title="Built to Scale"
          titleClassName="font-city"
          scrollHint="Scroll to expand"
          scrollDistance={1.5}
          holdDistance={0.5}
          useWindowScroll
        >
          <div className="max-w-2xl text-center px-4">
            <h2 className="text-4xl sm:text-6xl font-high text-white mb-4 font-city font-size-62px">
              Every detail, everywhere
            </h2>
          </div>
        </ScrollExpand>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FEATURED PROJECTS */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-36 px-8 sm:px-12 lg:px-20 bg-white">
        <div className="max-w-[1550px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 gap-6">
            <div>
              <span className="text-xs tracking-widest text-[#9B9B90] uppercase block mb-2">
                03 / SELECTED PORTFOLIO
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#141412]">
                Featured Works
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-black hover:text-neutral-600 transition-colors"
              >
                VIEW ALL 08 PROJECTS
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                layout="grid"
              />
            ))}
          </div>

          {/* Bottom Explore Button */}
          <div className="mt-16 text-center">
            <MagneticButton strength={0.3}>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-[#141412] text-white font-mono text-xs tracking-widest uppercase font-semibold hover:bg-black transition-all shadow-xl"
              >
                EXPLORE COMPLETE PORTFOLIO
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CLIENT TESTIMONIALS (Infinite Columns Animated Stream) */}
      {/* ========================================================================= */}
      <Testimonials />

      {/* ========================================================================= */}
      {/* SECTION 6: TRUSTED BY / LOGO LOOP */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white overflow-hidden border-t border-black/5">
        <div className="relative h-16 w-full">
          <LogoLoop
            logos={[
              { node: <SiSupabase size={48} color="black" />, title: 'Supabase', href: 'https://supabase.com' },
              { node: <SiReact size={48} color="black" />, title: 'React', href: 'https://react.dev' },
              { node: <SiNextdotjs size={48} color="black" />, title: 'Next.js', href: 'https://nextjs.org' },
              { node: <SiTypescript size={48} color="black" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
              { node: <SiTailwindcss size={48} color="black" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
              { node: <SiVercel size={48} color="black" />, title: 'Vercel', href: 'https://vercel.com' },
            ]}
            speed={60}
            direction="left"
            logoHeight={48}
            gap={64}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </section>

    </PageTransition>
  );
};
