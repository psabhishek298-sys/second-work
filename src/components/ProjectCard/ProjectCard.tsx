import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  layout?: 'grid' | 'editorial';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      <Link to={`/portfolio/${project.slug}`} className="block focus:outline-none">
        {/* Card Image Container with rounded corners */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 shadow-md">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Dark subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Floating Category Badge (Top Left) */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 text-[11px] font-mono tracking-widest uppercase bg-black/60 text-white backdrop-blur-md rounded-full border border-white/10 font-semibold">
              {project.category}
            </span>
          </div>

          {/* Quick Year (Top Right) */}
          <div className="absolute top-4 right-4 z-10">
            <span className="font-mono text-xs font-medium tracking-wider text-white/90 drop-shadow">
              {project.year}
            </span>
          </div>

          {/* Bottom Left: VIEW PROJECT */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-white/90 uppercase font-medium drop-shadow">
            <div className="h-[1px] w-3 bg-white/70" />
            <span>VIEW PROJECT</span>
            <div className="h-[1px] w-3 bg-white/70" />
          </div>

          {/* Bottom Right: Circular Arrow Action Button */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="w-10 h-10 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
        </div>

        {/* Card Header & Title Below Image */}
        <div className="mt-4 flex flex-col">
          {/* Top metadata line: 01 — KERALA, INDIA ... 5,800 sq.ft */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8c8c82] uppercase mb-1">
            <span>
              {formattedIndex} — {project.location}
            </span>
            <span>{project.area}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#1a1a18] tracking-tight group-hover:text-[#a38361] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Gold Accent Line under Title */}
          <div className="h-[2px] w-6 bg-[#a38361] mt-2 group-hover:w-10 transition-all duration-300" />
        </div>
      </Link>
    </motion.article>
  );
};
