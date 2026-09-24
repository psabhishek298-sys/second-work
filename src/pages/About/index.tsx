import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Award } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { RevealImage } from '../../components/RevealImage/RevealImage';

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
    <span ref={ref} className="font-display font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white">
      {count}
      <span className="text-3xl sm:text-5xl text-[#9B9B90]">{suffix}</span>
    </span>
  );
}

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Ar. Rohan Varma',
      role: 'Founder & Principal Architect',
      credentials: 'B.Arch (SPA), M.Arch (AA London), IIA',
      image: '/photos/imgi_4_project1.jpg',
      bio: 'Leading the spatial philosophy of TechPlus with 16+ years of international practice in vernacular sustainability and monolithic forms.',
    },
    {
      name: 'Maya Nair',
      role: 'Partner & Design Director',
      credentials: 'B.Arch (CEPT), M.Des (Harvard GSD)',
      image: '/photos/imgi_10_project3.jpg',
      bio: 'Directs interior architecture and material research, specializing in acoustic atmospheres and tactile surface finishes.',
    },
    {
      name: 'Devan Menon',
      role: 'Head of Technical & Structural Execution',
      credentials: 'B.Tech Civil, M.Sc Facade Engineering',
      image: '/photos/imgi_11_project4.jpg',
      bio: 'Oversees structural realization, complex cantilevers, climatic thermal modeling, and on-site craftsmanship.',
    },
    {
      name: 'Aisha Rao',
      role: 'Senior Landscape Architect',
      credentials: 'MLA (NUS Singapore)',
      image: '/photos/imgi_14_project7.jpg',
      bio: 'Pioneers native tropical biophilic ecosystems, courtyards, rain gardens, and ecological site regenerations.',
    },
  ];

  const awards = [
    { year: '2025', title: 'Architectural Review — House of the Year (Nominee)', project: 'The Courtyard House' },
    { year: '2024', title: 'IIA National Excellence in Architecture Award', project: 'Monsoon Residence' },
    { year: '2024', title: 'World Architecture Festival — Hospitality Category Shortlist', project: 'Coastal Retreat' },
    { year: '2023', title: 'Asia Pacific Design Excellence — Workplace Award', project: 'The Minimal Office' },
    { year: '2022', title: 'Sustainable Built Environment Award (IGBC Platinum)', project: 'Urban Pavilion' },
  ];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-48 pb-20 px-6 sm:px-10 lg:px-16 bg-white text-[#141412] border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase">STUDIO PROFILE</span>
            <div className="h-[1px] w-12 bg-black/15" />
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] font-medium leading-[0.95] tracking-tighter text-[#141412] max-w-5xl">
            We design with purpose.
          </h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-8 text-xl sm:text-2xl text-[#484842] font-editorial leading-relaxed">
              TECHPLUS is an international architecture and spatial design practice founded in 2011. We believe that physical spaces have the profound power to anchor memories, foster contemplation, and harmonize human lives with the natural elements.
            </p>
            <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs text-[#9B9B90]">
              <span>KOCHI &bull; BANGALORE &bull; GOA</span>
              <span>SPECIALIZED IN TROPICAL &amp; MINIMAL ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* EDITORIAL ASYMMETRIC STORY SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block">
              OUR STORY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-normal leading-[1.15] text-[#141412]">
              Rooted in tradition. Executed with surgical contemporary precision.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#6E6E65] font-light leading-relaxed">
              <p>
                Founded in Kerala, where tropical monsoons, lush flora, and ancient woodcraft traditions shape everyday living, TECHPLUS began with a singular goal: to create architecture that responds sincerely to the land.
              </p>
              <p>
                Over 15 years, our practice has grown to encompass boutique resorts, private villas, corporate headquarters, and cultural landscape developments across 12 cities.
              </p>
              <p>
                We eschew fleeting aesthetic trends in favor of timeless tectonic principles — calibrated natural daylight, deep shadow play, natural passive ventilation, and unadorned materials that gain beauty as they age.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <RevealImage
                src="/photos/imgi_4_baner1.jpg"
                alt="TechPlus Studio Philosophy"
                aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
              />
              <div className="mt-4 flex justify-between items-center text-xs font-mono text-[#9B9B90]">
                <span>FIG 01. MONOLITHIC MATERIAL STUDY</span>
                <span>KOCHI ATELIER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ANIMATED STATISTICS SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#141412] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b border-white/10 pb-4 flex justify-between items-center">
            <span className="font-mono text-xs tracking-widest text-[#A89F91] uppercase">
              STUDIO METRICS &amp; IMPACT
            </span>
            <span className="font-mono text-xs text-[#9B9B90]">2011 — 2026</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { target: 15, suffix: '+', label: 'Years of Design', desc: 'Crafting spaces since 2011' },
              { target: 60, suffix: '+', label: 'Built Projects', desc: 'Residential, Commercial & Resorts' },
              { target: 12, suffix: '', label: 'Cities', desc: 'Across India and Southeast Asia' },
              { target: 25, suffix: '+', label: 'Collaborators', desc: 'Architects, engineers & artisans' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col border-l border-white/10 pl-6 space-y-2">
                <CounterNumber target={stat.target} suffix={stat.suffix} />
                <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-white font-medium">
                  {stat.label}
                </span>
                <span className="text-xs text-[#9B9B90]">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STUDIO LEADERSHIP & TEAM */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block mb-2">
              STUDIO LEADERSHIP
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-[#141412]">
              The minds behind the spaces.
            </h2>
            <p className="mt-4 text-sm text-[#6E6E65]">
              A collaborative team of architects, interior sculptors, environmental engineers, and site coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group">
                <div className="relative overflow-hidden rounded-md bg-neutral-100 aspect-[3/4] mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-medium text-[#141412]">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-[#A89F91] tracking-wider uppercase font-medium">
                    {member.role}
                  </p>
                  <p className="font-mono text-[11px] text-[#9B9B90]">{member.credentials}</p>
                  <p className="pt-2 text-xs text-[#6E6E65] leading-relaxed font-sans">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* AWARDS & RECOGNITIONS */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Award className="w-5 h-5 text-[#141412]" />
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase">
              HONORS &amp; RECOGNITIONS
            </span>
          </div>

          <div className="divide-y divide-black/10">
            {awards.map((award, i) => (
              <div
                key={i}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-black/[0.02] px-2 rounded-lg transition-colors"
              >
                <div className="md:col-span-2 font-mono text-sm text-[#9B9B90] font-bold">
                  {award.year}
                </div>
                <div className="md:col-span-7 font-display text-xl sm:text-2xl text-[#141412]">
                  {award.title}
                </div>
                <div className="md:col-span-3 text-right font-mono text-xs text-[#6E6E65] uppercase">
                  {award.project}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </PageTransition>
  );
};
