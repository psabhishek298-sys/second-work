import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const StanzzaPrinciples: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 5 full-screen width cards: shift 80% to reveal all 5 panels
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  const cards = [
    {
      id: '01',
      title: 'Architecture',
      type: 'architecture',
      bgColor: 'bg-[#f4f1ea]',
      textColor: 'text-[#141412]',
      subColor: 'text-[#484842]',
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
      subColor: 'text-[#484842]',
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
    <section ref={containerRef} className="relative h-[500vh] bg-[#0d0d0c]">
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-center">
        
        {/* Horizontal Track for Fullscreen Hero Cards */}
        <motion.div style={{ x }} className="flex w-full h-full items-center">
          
          {/* Intro Hero Card */}
          <div className="w-[95vw] sm:w-[96vw] h-[92vh] shrink-0 mx-[2.5vw] rounded-[40px] bg-[#131e36] text-white p-8 sm:p-16 lg:p-24 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/10">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs sm:text-sm text-white/50 tracking-[0.2em] uppercase">
                [ TECHPLUS ATELIER ]
              </span>
              <span className="font-mono text-xs text-white/40 tracking-widest">
                [ 00 / METHODOLOGY ]
              </span>
            </div>

            <div className="my-auto max-w-5xl">
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-light leading-[1.05] tracking-tight text-white mb-6">
                Architectural thinking.<br />
                Design sensibility.<br />
                <span className="italic font-editorial text-white/90">Premium delivery.</span>
              </h2>
            </div>

            <div className="flex items-center justify-between border-t border-white/15 pt-6 font-mono text-xs text-white/50 uppercase tracking-widest">
              <span>04 PRINCIPLES OF SPACE</span>
              <span>SCROLL TO EXPLORE &rarr;</span>
            </div>
          </div>

          {/* 4 Fullscreen Principle Hero Cards */}
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-[95vw] sm:w-[96vw] h-[92vh] shrink-0 mx-[2.5vw] rounded-[40px] ${card.bgColor} ${card.textColor} p-8 sm:p-14 lg:p-20 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300`}
            >
              {/* Card Top Header */}
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className={`font-mono text-xs sm:text-sm ${card.badgeColor} tracking-widest font-bold`}>
                    [ {card.id} ]
                  </span>
                  <h3 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <span className={`font-mono text-xs ${card.badgeColor} uppercase tracking-widest hidden sm:block`}>
                  TECHPLUS METHODOLOGY
                </span>
              </div>

              {/* Card Center Content */}
              <div className="my-auto py-6 w-full flex items-center justify-center">
                {card.type === 'architecture' && (
                  <div className="w-full max-w-5xl h-[42vh] sm:h-[50vh] rounded-3xl overflow-hidden bg-black/5 border border-black/10 shadow-2xl p-2 sm:p-4">
                    <img
                      src={card.image}
                      alt="Architectural Planning"
                      className="w-full h-full object-cover rounded-2xl filter grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}

                {card.type === 'design' && (
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl h-[42vh] sm:h-[50vh] items-center">
                    {card.gallery?.slice(0, 3).map((img, i) => (
                      <div
                        key={i}
                        className={`relative overflow-hidden rounded-3xl bg-white/10 shadow-2xl h-full ${
                          i === 1 ? 'transform -translate-y-3' : ''
                        }`}
                      >
                        <img
                          src={img}
                          alt="Design gallery item"
                          className="w-full h-full object-cover filter contrast-110 hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {card.type === 'delivery' && (
                  <div className="w-full max-w-5xl h-[42vh] sm:h-[50vh] rounded-3xl overflow-hidden shadow-2xl border border-black/10">
                    <img
                      src={card.image}
                      alt="Execution & Delivery"
                      className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}

                {card.type === 'materiality' && (
                  <div className="w-full max-w-5xl h-[42vh] sm:h-[50vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src={card.image}
                      alt="Materiality & Atmosphere"
                      className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>

              {/* Card Bottom Description */}
              <div className="max-w-3xl pt-4 border-t border-current/10">
                <p className={`text-xl sm:text-2xl lg:text-3xl ${card.subColor} font-sans leading-relaxed font-light`}>
                  {card.description}
                </p>
              </div>
            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};
