import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { api } from '../../services/api';
import { Project, Category } from '../../data/projects';

export const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getCategories(), api.getProjects()]).then(([cats, projs]) => {
      setCategories(cats);
      setProjects(projs);
      setLoading(false);
    });
  }, []);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setLoading(true);
    api.getProjects(slug === 'all' ? undefined : slug).then((projs) => {
      setProjects(projs);
      setLoading(false);
    });
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <PageTransition>
      <div className="bg-[#F5F4F0] text-[#141412] min-h-screen font-sans selection:bg-black selection:text-white">
        {/* ========================================================================= */}
        {/* HERO SECTION WITH PORTIMG.PNG BACKGROUND */}
        {/* ========================================================================= */}
        <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-32 sm:pt-40 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#F5F4F0]">
          {/* Background Image: portimg.png */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src="/photos/portimg.png"
              alt="TechPlus Architecture Hero"
              className="absolute right-0 top-0 h-full w-full object-cover object-right-top sm:object-right"
            />
            {/* Left blend gradient */}
            <div className="absolute inset-y-0 left-0 w-full lg:w-[45%] bg-gradient-to-r from-[#F5F4F0] via-[#F5F4F0]/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F4F0] to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 py-6">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-[#141412]/40" />
                <span className="font-mono text-xs tracking-widest text-[#73736C] uppercase font-medium">
                  SELECTED WORKS
                </span>
              </div>

              <div>
                <h1 className="font-display tracking-tight text-black text-6xl sm:text-7xl lg:text-8xl font-light leading-[0.95]">
                  <span className="font-city">Works &</span><br />
                  <span className="font-city">Spaces</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#6E6E65] font-light max-w-md leading-relaxed">
                A curated collection of residential, commercial, hospitality and landscape interventions designed by TechPlus.
              </p>

              <div className="pt-2">
                <a
                  href="#works-grid"
                  className="inline-flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="font-mono text-xs tracking-widest uppercase text-black font-semibold">
                    EXPLORE PROJECTS
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

          {/* ========================================================================= */}
          {/* CATEGORY FILTER TABS BAR */}
          {/* ========================================================================= */}
          <div id="works-grid" className="max-w-7xl mx-auto w-full relative z-10 mt-12 pt-6 border-t border-black/10">
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#141412] text-white shadow-lg scale-105'
                        : 'bg-[#ECEAE3] text-[#6E6E65] hover:bg-[#E2DFD7] hover:text-black'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MASONRY / BENTO PORTFOLIO GRID */}
        {/* ========================================================================= */}
        <section className="pb-24 px-6 sm:px-10 lg:px-16 min-h-[70vh]">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-[#ECEAE3] rounded-3xl h-80 animate-pulse" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 lg:space-y-8"
                >
                  {/* TOP ROW: 3 Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {filteredProjects.slice(0, 3).map((project, idx) => (
                      <ProjectBentoCard
                        key={project.id}
                        project={project}
                        number={`0${idx + 1}`}
                        aspect="aspect-[4/3] lg:aspect-[1/1]"
                      />
                    ))}
                  </div>

                  {/* SECOND ROW & THIRD ROW: Asymmetric Layout (2 Left + 1 Tall Right) */}
                  {filteredProjects.length > 3 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                      
                      {/* Left 2 Columns */}
                      <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                        {/* 2 Equal Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                          {filteredProjects.slice(3, 5).map((project, idx) => (
                            <ProjectBentoCard
                              key={project.id}
                              project={project}
                              number={`0${idx + 4}`}
                              aspect="aspect-[4/3] lg:aspect-[1/1]"
                            />
                          ))}
                        </div>

                        {/* Wide Landscape Card 07 */}
                        {filteredProjects[6] && (
                          <ProjectBentoCard
                            project={filteredProjects[6]}
                            number="07"
                            aspect="aspect-[16/9] lg:aspect-[21/9]"
                          />
                        )}
                      </div>

                      {/* Right Column: Tall Card + Quote Box */}
                      <div className="space-y-6 lg:space-y-8">
                        {/* Tall Card 06 */}
                        {filteredProjects[5] && (
                          <ProjectBentoCard
                            project={filteredProjects[5]}
                            number="06"
                            aspect="aspect-[3/4] lg:aspect-[3/4]"
                          />
                        )}

                        {/* Quote Banner Box */}
                        <div className="p-8 sm:p-10 rounded-3xl bg-[#EBE8E0] border border-black/5 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                          {/* Arch curve shape background */}
                          <div className="absolute right-0 bottom-0 w-36 h-36 rounded-tl-full bg-[#E2DFD6] pointer-events-none opacity-60 group-hover:scale-105 transition-transform" />

                          <div className="relative z-10 space-y-4">
                            <div className="h-[1px] w-8 bg-black/20" />
                            <p className="font-serif italic text-2xl sm:text-3xl text-black leading-snug">
                              "Spaces that connect people, place and purpose."
                            </p>
                          </div>

                          <div className="relative z-10 pt-6">
                            <Link
                              to="/portfolio"
                              onClick={() => handleCategoryChange('all')}
                              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase font-semibold text-black hover:opacity-75 transition-opacity"
                            >
                              VIEW ALL WORKS
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Additional Cards (If any) */}
                  {filteredProjects.length > 7 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
                      {filteredProjects.slice(7).map((project, idx) => (
                        <ProjectBentoCard
                          key={project.id}
                          project={project}
                          number={`0${idx + 8}`}
                          aspect="aspect-[4/3]"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PANORAMIC ARCHITECTURAL IMAGE BANNER */}
        {/* ========================================================================= */}
        <section className="w-full h-[60vh] sm:h-[75vh] relative overflow-hidden">
          <img
            src="/photos/pcherp1.png"
            alt="TechPlus Architecture Mountain Villa"
            className="w-full h-full object-cover object-center"
          />
          
          <div className="absolute bottom-12 left-6 sm:left-10 lg:left-16 right-6 text-black max-w-4xl">
            <span className="font-mono text-xs tracking-widest text-black/70 uppercase block mb-2 font-semibold">
              BUILDING WITH PURPOSE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-black">
              Crafting spatial experiences for a sustainable tomorrow.
            </h2>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

/* ========================================================================= */
/* BENTO CARD COMPONENT */
/* ========================================================================= */
interface ProjectBentoCardProps {
  project: Project;
  number: string;
  aspect?: string;
}

const ProjectBentoCard: React.FC<ProjectBentoCardProps> = ({ project, number, aspect = 'aspect-[4/3]' }) => {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className={`group relative rounded-3xl overflow-hidden shadow-lg block bg-[#0D0D0C] ${aspect}`}
    >
      {/* Background Image */}
      <img
        src={project.coverImage || project.heroImage}
        alt={project.title}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 group-hover:from-black/90 transition-colors" />

      {/* Top Bar: Number left, Category right */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-10">
        <span className="font-mono text-lg font-semibold tracking-wider text-white/90">
          {number}
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/70 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          {project.category}
        </span>
      </div>

      {/* Bottom Content: Title, Location & Arrow */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10">
        <div className="space-y-1 pr-4">
          <h3 className="font-display text-2xl sm:text-3xl font-normal leading-tight group-hover:translate-x-1 transition-transform">
            {project.title}
          </h3>
          <p className="font-mono text-[11px] tracking-widest uppercase text-white/70">
            📍 {project.location}
          </p>
        </div>

        {/* Circular Arrow Button */}
        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 flex-shrink-0">
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
