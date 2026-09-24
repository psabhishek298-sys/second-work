import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, ListFilter } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { api } from '../../services/api';
import { Project, Category } from '../../data/projects';

export const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
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

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HEADER */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-48 pb-16 px-6 sm:px-10 lg:px-16 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase">
              SELECTED PORTFOLIO
            </span>
            <div className="h-[1px] w-12 bg-black/15" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#141412]">
                Works &amp; Spaces
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#6E6E65] max-w-xl font-light">
                A curated survey of residential, commercial, hospitality, and landscape interventions designed by TechPlus.
              </p>
            </div>

            {/* View layout toggle */}
            <div className="hidden sm:flex items-center gap-2 p-1 rounded-lg bg-neutral-100">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-[#141412] text-white shadow-sm' : 'text-[#6E6E65] hover:text-[#141412]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('editorial')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'editorial' ? 'bg-[#141412] text-white shadow-sm' : 'text-[#6E6E65] hover:text-[#141412]'
                }`}
                title="Editorial Wide View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-12 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#141412] text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                  }`}
                >
                  {cat.name}
                  {cat.slug !== 'all' && (
                    <span className="ml-2 opacity-60 text-[10px]">
                      ({projects.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length || cat.count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROJECTS GRID */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse space-y-4">
                  <div className="bg-neutral-100 rounded-md aspect-[4/3] w-full" />
                  <div className="h-6 bg-neutral-100 rounded w-1/2" />
                  <div className="h-4 bg-neutral-100 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={
                  viewMode === 'editorial'
                    ? 'space-y-16'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10'
                }
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    layout={viewMode}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {projects.length === 0 && !loading && (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-[#6E6E65]">
                No projects found in this category.
              </p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="mt-4 font-mono text-xs text-[#141412] uppercase tracking-wider underline underline-offset-4"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};
