import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { SiSupabase, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVercel } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { MagneticButton } from '../../components/MagneticButton/MagneticButton';
import { RevealImage } from '../../components/RevealImage/RevealImage';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { Testimonials } from '../../components/Testimonials/Testimonials';
import { LogoLoop } from '../../components/ui/LogoLoop';
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

  const statementWords = "We believe great architecture is experienced, not just seen.".split(' ');

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
      <section
        ref={statementRef}
        className="py-28 sm:py-40 px-6 sm:px-10 lg:px-16 bg-white text-[#141412] border-b border-black/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase">01 / MANIFESTO</span>
            <div className="h-[1px] w-12 bg-black/15" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.12] tracking-tighter text-[#141412] max-w-5xl">
            {statementWords.map((word, i) => (
              <span
                key={i}
                className="statement-word inline-block mr-[0.28em] transition-colors duration-200"
              >
                {word}
              </span>
            ))}
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-black/5">
            <div>
              <p className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase mb-2">01. CONTEXTUALITY</p>
              <p className="text-sm text-[#6E6E65] leading-relaxed">
                Rooted in local geography, sunlight angles, climate patterns, and native building traditions.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase mb-2">02. MATERIAL HONESTY</p>
              <p className="text-sm text-[#6E6E65] leading-relaxed">
                Raw rammed earth, exposed tactile concrete, reclaimed timber, and unvarnished natural stones.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase mb-2">03. HUMAN WELL-BEING</p>
              <p className="text-sm text-[#6E6E65] leading-relaxed">
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
        className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-white text-[#141412] border-b border-black/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
                <span className="font-mono text-[10px] tracking-widest text-[#9B9B90] uppercase block mb-1">
                  SPATIAL PURITY
                </span>
                <p className="text-xs text-[#484842] font-sans leading-relaxed">
                  "Every plane and shadow must have intention. When unnecessary ornament is shed, pure space emerges."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block">
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
      {/* SECTION 3: FEATURED PROJECTS */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 gap-6">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block mb-2">
                03 / SELECTED PORTFOLIO
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#141412]">
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
      {/* SECTION 4: FOUR PILLARS / METHODOLOGY */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block mb-2">
              04 / ARCHITECTURAL PRINCIPLES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-[#141412]">
              Crafting timeless built environments with rigor and sensitivity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Compass,
                number: '01',
                title: 'Site Specificity',
                desc: 'Every project begins with deep listening to solar trajectories, wind paths, topography, and native ecology.',
              },
              {
                icon: Layers,
                number: '02',
                title: 'Tectonic Clarity',
                desc: 'Structures are designed with straightforward joints, honest load-bearing systems, and authentic raw materials.',
              },
              {
                icon: Sparkles,
                number: '03',
                title: 'Sensory Atmosphere',
                desc: 'We sculpt with indirect daylight, air currents, water acoustics, and tactile textures that age gracefully.',
              },
              {
                icon: ShieldCheck,
                number: '04',
                title: 'Sustainable Longevity',
                desc: 'Passive climate control and durable local construction ensure buildings endure for generations.',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-xl hover:border-neutral-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-[#141412]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-[#9B9B90] font-bold">{pillar.number}</span>
                    </div>
                    <h3 className="font-display text-2xl font-medium text-[#141412] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#6E6E65] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
