import React from 'react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { RevealImage } from '../../components/RevealImage/RevealImage';
import ScrollStack, { ScrollStackItem } from '../../components/ui/ScrollStack';

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
  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-48 pb-16 px-6 sm:px-10 lg:px-16 bg-white border-b border-black/5">
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
      {/* FULL SCREEN SCROLL STACK PROCEDURE SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 bg-[#F9F9F8] min-h-screen">
        <div className="max-w-7xl mx-auto mb-12">
          <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block mb-2">
            STACKED TIMELINE EXPERIENCE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-medium text-[#141412]">
            5-Phase Architectural Journey
          </h2>
        </div>

        <div className="w-full">
          <ScrollStack
            itemDistance={60}
            itemScale={0.035}
            itemStackDistance={35}
            stackPosition="15%"
            scaleEndPosition="5%"
            baseScale={0.88}
            rotationAmount={0}
            blurAmount={1.5}
            useWindowScroll={true}
            className="w-full"
          >
            {STEPS.map((step) => (
              <ScrollStackItem
                key={step.number}
                itemClassName="bg-white border border-black/10 shadow-2xl rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Content Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#141412] text-white flex items-center justify-center font-mono text-base font-bold shadow-md">
                        {step.number}
                      </div>
                      <div>
                        <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block font-semibold">
                          PHASE {step.number}
                        </span>
                        <h3 className="font-display text-3xl sm:text-4xl font-medium text-[#141412]">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="font-editorial text-lg sm:text-xl text-[#141412] italic">
                      &ldquo;{step.subtitle}&rdquo;
                    </p>

                    <p className="text-sm sm:text-base text-[#6E6E65] font-light leading-relaxed">
                      {step.description}
                    </p>

                    <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-black/5 space-y-3">
                      <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase block font-semibold">
                        KEY DELIVERABLES &amp; ACTIONS:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-[#484842]">
                        {step.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#141412] font-bold">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="lg:col-span-5 hidden sm:block">
                    <div className="relative rounded-2xl overflow-hidden border border-black/5 shadow-md">
                      <RevealImage
                        src={step.image}
                        alt={`${step.title} - Architectural Phase`}
                        aspectRatio="aspect-[4/3]"
                        clipReveal={true}
                      />
                      <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-mono text-[#141412] shadow-sm">
                        STAGE {step.number} / 05
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>
    </PageTransition>
  );
};
