import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';

import { api } from '../../services/api';
import { Project } from '../../data/projects';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | null>(null);
  const [nextSlug, setNextSlug] = useState<string | null>(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    api
      .getProjectBySlug(slug)
      .then((data) => {
        setProject(data.project);
        setPrevSlug(data.prevSlug);
        setNextSlug(data.nextSlug);
        setLoading(false);
      })
      .catch(() => {
        navigate('/portfolio');
      });
  }, [slug, navigate]);

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="font-mono text-xs tracking-widest text-neutral-400 uppercase animate-pulse">
          LOADING ARCHITECTURAL DATA...
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* FULLSCREEN HERO */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] lg:min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 lg:px-16 bg-[#121210] text-white overflow-hidden">
        {/* Fullscreen Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.heroImage || project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-black/20 to-black/60" />
        </div>

        {/* Top Back Navigation Link */}
        <div className="relative z-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 text-white backdrop-blur-md border border-white/10 font-mono text-xs tracking-widest uppercase hover:bg-black/60 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO PORTFOLIO
          </Link>
        </div>

        {/* Project Title & Summary in Hero */}
        <div className="relative z-10 max-w-5xl my-auto py-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono uppercase tracking-widest">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#CACAC0]">&bull;</span>
            <span className="text-xs font-mono text-[#CACAC0] uppercase tracking-wider">{project.location}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white">
            {project.title}
          </h1>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* HIGH-RES GALLERY SECTION */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto space-y-8 lg:space-y-16">
          {project.gallery.map((imgUrl, i) => (
            <div
              key={i}
              className="group relative cursor-pointer overflow-hidden rounded-md bg-neutral-100 w-full"
              onClick={() => setActiveLightboxImg(imgUrl)}
            >
              <img
                src={imgUrl}
                alt={`${project.title} - Image ${i + 1}`}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
                  <Maximize2 className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PREV / NEXT PROJECT NAVIGATION */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#141412] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          {prevSlug && (
            <Link
              to={`/portfolio/${prevSlug}`}
              className="group flex items-center gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs text-[#9B9B90] tracking-widest uppercase block">
                  PREVIOUS WORK
                </span>
                <span className="font-display text-2xl text-white group-hover:text-[#CACAC0] transition-colors">
                  Navigate Back
                </span>
              </div>
            </Link>
          )}

          <div className="h-[1px] w-12 bg-white/20 hidden sm:block" />

          {nextSlug && (
            <Link
              to={`/portfolio/${nextSlug}`}
              className="group flex items-center gap-4 text-right"
            >
              <div>
                <span className="font-mono text-xs text-[#9B9B90] tracking-widest uppercase block">
                  NEXT WORK
                </span>
                <span className="font-display text-2xl text-white group-hover:text-[#CACAC0] transition-colors">
                  Next Project
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setActiveLightboxImg(null)}
          >
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeLightboxImg}
              alt={project.title}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
