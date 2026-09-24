import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../data/projects';
import { RevealImage } from '../RevealImage/RevealImage';

interface ProjectCardProps {
  project: Project;
  index: number;
  layout?: 'grid' | 'editorial';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, layout = 'grid' }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link to={`/portfolio/${project.slug}`} className="block focus:outline-none">
        {/* Card Image Container */}
        <div className="relative overflow-hidden rounded-md bg-neutral-100">
          <div className="transform transition-transform duration-700 ease-out group-hover:scale-105">
            <RevealImage
              src={project.coverImage}
              alt={project.title}
              aspectRatio={layout === 'editorial' ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-[4/3]'}
              clipReveal={true}
            />
          </div>

          {/* Floating Category Pill on Image */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 text-xs font-mono tracking-wider uppercase bg-black/80 text-white backdrop-blur-md rounded-full border border-white/10">
              {project.category}
            </span>
          </div>

          {/* Quick Year Pill */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 text-xs font-mono tracking-wider bg-white/90 text-black backdrop-blur-md rounded-full shadow-sm">
              {project.year}
            </span>
          </div>

          {/* Hover Overlay with Arrow */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
              <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="mt-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs tracking-widest text-neutral-400">{formattedIndex}</span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="font-mono text-xs tracking-wider text-neutral-600 uppercase">{project.location}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-black group-hover:text-neutral-600 transition-colors">
              {project.title}
            </h3>
          </div>

          <div className="hidden sm:block text-right">
            <span className="font-mono text-xs text-neutral-400 block">{project.area}</span>
            <span className="text-xs text-neutral-600 uppercase tracking-wider">{project.status}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
