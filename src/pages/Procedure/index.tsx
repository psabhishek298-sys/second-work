import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { RevealImage } from '../../components/RevealImage/RevealImage';

gsap.registerPlugin(ScrollTrigger);

interface StepData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
}

const STEPS: StepData[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Understanding the client, site and requirements.',
    description:
      'We commence with thorough site forensics — mapping sun paths, prevailing winds, soil composition, neighboring context, and local bylaws. We dive into deep conversational dialogues to uncover your lifestyle, spatial aspirations, and functional priorities.',
    deliverables: [
      'Topographic & Climatic Site Analysis',
      'Client Lifestyle & Spatial Brief',
      'Zoning, FAR & Regulatory Feasibility',
      'Initial Budget & Timeline Framework',
    ],
    image: '/photos/imgi_6_baner6.jpg',
  },
  {
    number: '02',
    title: 'CONCEPT',
    subtitle: 'Developing the architectural direction.',
    description:
      'Through massing models, light studies, and volumetric sketches, the fundamental architectural thesis takes shape. We establish the relationship between solid masses, voids, courtyards, and circulation paths.',
    deliverables: [
      'Architectural Concept Narrative',
      'Volumetric Massing & Circulation Studies',
      'Preliminary 3D Spatial Renderings',
      'Preliminary Mood & Material Boards',
    ],
    image: '/photos/imgi_7_baner3.jpg',
  },
  {
    number: '03',
    title: 'DESIGN',
    subtitle: 'Refining form, materials, space and experience.',
    description:
      'The approved concept is meticulously sculpted into detailed architectural plans, sections, and elevations. Every tactile finish, joinery detail, acoustic boundary, and daylight aperture is specified.',
    deliverables: [
      'Comprehensive Architectural Drawings',
      'Photorealistic Ray-Traced 3D Visualizations',
      'Physical Material & Finish Board Curation',
      'Structural & MEP Engineering Alignment',
    ],
    image: '/photos/imgi_8_baner4.jpg',
  },
  {
    number: '04',
    title: 'DEVELOP',
    subtitle: 'Detailed drawings, documentation and coordination.',
    description:
      'We prepare millimeter-accurate working drawings, joinery details, structural calculations, and MEP services schematics. We assist in contractor vetting, bill of quantities (BOQ), and statutory permit approvals.',
    deliverables: [
      'Complete Working Construction Drawings (GFC)',
      'Detailed Bill of Quantities (BOQ)',
      'Contractor & Vendor Tender Documentation',
      'Statutory & Municipal Approval Submissions',
    ],
    image: '/photos/imgi_9_baner7.jpg',
  },
  {
    number: '05',
    title: 'DELIVER',
    subtitle: 'Bringing the design into reality.',
    description:
      'Our principal architects and site coordinators conduct regular site inspections to ensure uncompromised craftsmanship, precise joinery, and fidelity to the architectural vision until final handover.',
    deliverables: [
      'Periodic On-Site Architectural Quality Audits',
      'Mockup Inspections (Concrete, Joinery, Plasters)',
      'Landscape & Lighting Calibrations',
      'Final Snagging & As-Built Handover Package',
    ],
    image: '/photos/imgi_10_baner8.jpg',
  },
];

export const ProcedurePage: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-48 pb-20 px-6 sm:px-10 lg:px-16 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase">
              STUDIO METHODOLOGY
            </span>
            <div className="h-[1px] w-12 bg-black/15" />
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tighter text-[#141412] max-w-5xl">
            From idea to space.
          </h1>

          <p className="mt-8 text-lg sm:text-2xl text-[#484842] font-editorial max-w-3xl leading-relaxed">
            Our structured 5-phase procedure bridges visionary conceptual thinking with rigorous on-site construction discipline.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VERTICAL TIMELINE SECTION */}
      {/* ========================================================================= */}
      <section ref={timelineRef} className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto relative">
          {/* Center Vertical Connecting Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-[2px] bg-black/10 -translate-x-1/2">
            <motion.div
              style={{ scaleY: lineHeight }}
              className="w-full h-full bg-[#141412] origin-top"
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-24 sm:space-y-36">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.number}
                  className={`relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#141412] text-white flex items-center justify-center font-mono text-sm font-bold shadow-md">
                        {step.number}
                      </div>
                      <div>
                        <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block">
                          PHASE {step.number}
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#141412]">
                          {step.title}
                        </h2>
                      </div>
                    </div>

                    <p className="font-editorial text-xl sm:text-2xl text-[#141412] italic">
                      &ldquo;{step.subtitle}&rdquo;
                    </p>

                    <p className="text-sm sm:text-base text-[#6E6E65] font-light leading-relaxed">
                      {step.description}
                    </p>

                    <div className="p-6 rounded-xl bg-neutral-50 border border-black/5 space-y-3">
                      <span className="font-mono text-[11px] tracking-widest text-[#9B9B90] uppercase block font-semibold">
                        KEY DELIVERABLES &amp; ACTIONS:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#484842]">
                        {step.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#141412] font-bold">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Image Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative group">
                      <RevealImage
                        src={step.image}
                        alt={`${step.title} - Architectural Phase`}
                        aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                        clipReveal={true}
                      />
                      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono text-[#141412] shadow-sm">
                        STAGE {step.number} / 05
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


    </PageTransition>
  );
};
