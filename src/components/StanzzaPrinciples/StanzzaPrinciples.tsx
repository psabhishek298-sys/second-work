import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const StanzzaPrinciples: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  const cards = [
    {
      id: '01',
      title: 'Architecture',
      type: 'architecture',
      bgColor: 'bg-[#f4f1ea]',
      textColor: 'text-[#141412]',
      subColor: 'text-[#6E6E65]',
      badgeColor: 'text-[#8C8C82]',
      description: 'Planning, circulation, engineering logic. The invisible layer that makes daily life effortless.',
      image: '/photos/imgi_4_project1.jpg',
    },
    {
      id: '02',
      title: 'Design',
      type: 'design',
      bgColor: 'bg-[#131e36]',
      textColor: 'text-white',
      subColor: 'text-white/80',
      badgeColor: 'text-white/50',
      description: 'Material, light, proportion, restraint. Choices that feel calm and age well.',
      gallery: [
        '/photos/imgi_10_project3.jpg',
        '/photos/imgi_4_project1.jpg',
        '/photos/imgi_14_project7.jpg',
        '/photos/imgi_11_project4.jpg',
        '/photos/imgi_7_baner3.jpg',
      ],
    },
    {
      id: '03',
      title: 'Delivery',
      type: 'delivery',
      bgColor: 'bg-[#f4f1ea]',
      textColor: 'text-[#141412]',
      subColor: 'text-[#6E6E65]',
      badgeColor: 'text-[#8C8C82]',
      description: 'Coordination, timing, detailing through handover. Where the design stays intact.',
      image: '/photos/imgi_10_project3.jpg',
    },
    {
      id: '04',
      title: 'Materiality',
      type: 'materiality',
      bgColor: 'bg-[#131e36]',
      textColor: 'text-white',
      subColor: 'text-white/80',
      badgeColor: 'text-white/50',
      description: 'Tactile rammed earth, unadorned stone & timber. Spaces built to age with grace.',
      image: '/photos/imgi_5_baner5.jpg',
    },
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0c0c0b]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-10">
        
        {/* Section Header */}
        <div className="px-6 sm:px-12 mb-6 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase">
              04 / ARCHITECTURAL PRINCIPLES
            </span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
            [ SCROLL TO EXPLORE ]
          </span>
        </div>

        {/* Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-6 sm:px-12 items-center">
            
            {/* Intro Lead Card */}
            <div className="w-[85vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] shrink-0 h-[68vh] rounded-3xl bg-[#181816] border border-white/10 p-8 sm:p-12 flex flex-col justify-between text-white">
              <div>
                <span className="font-mono text-xs text-white/50 tracking-widest block mb-6">
                  [ IN YEARS ]
                </span>
                <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-white">
                  Architectural thinking.<br />
                  Design sensibility.<br />
                  Premium delivery.
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                <span>TECHPLUS ATELIER</span>
                <span>&bull;</span>
                <span>METHODOLOGY</span>
              </div>
            </div>

            {/* Principles Cards */}
            {cards.map((card) => (
              <div
                key={card.id}
                className={`w-[88vw] sm:w-[70vw] md:w-[55vw] lg:w-[44vw] shrink-0 h-[68vh] rounded-[32px] ${card.bgColor} ${card.textColor} p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300`}
              >
                {/* Header: Index & Title */}
                <div className="flex items-baseline gap-4">
                  <span className={`font-mono text-xs ${card.badgeColor} tracking-wider`}>
                    [ {card.id} ]
                  </span>
                  <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Center Content depending on card type */}
                <div className="my-auto py-4 flex justify-center items-center">
                  {card.type === 'architecture' && (
                    <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-black/5 border border-black/10 flex items-center justify-center p-4">
                      <img
                        src={card.image}
                        alt="Architectural Planning"
                        className="w-full h-full object-cover rounded-xl filter grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  {card.type === 'design' && (
                    <div className="grid grid-cols-3 gap-3 w-full max-w-md items-center py-2">
                      {card.gallery?.map((img, i) => (
                        <div
                          key={i}
                          className={`relative overflow-hidden rounded-xl bg-white/10 shadow-lg ${
                            i === 0 ? 'col-span-2 h-28 sm:h-36' : 'h-28 sm:h-36'
                          }`}
                        >
                          <img
                            src={img}
                            alt="Design collage"
                            className="w-full h-full object-cover filter contrast-110 hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {card.type === 'delivery' && (
                    <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={card.image}
                        alt="Delivery Execution"
                        className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  {card.type === 'materiality' && (
                    <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={card.image}
                        alt="Materiality Study"
                        className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Footer Description */}
                <div className="max-w-md">
                  <p className={`text-sm sm:text-base ${card.subColor} font-sans leading-relaxed font-light`}>
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

          </motion.div>
        </div>

      </div>
    </section>
  );
};
