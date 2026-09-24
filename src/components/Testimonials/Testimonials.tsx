import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsColumn, TestimonialItem } from '../ui/testimonials-columns-1';

const testimonials: TestimonialItem[] = [
  {
    text: "TechPlus transformed our coastal property into an architectural masterpiece. The way daylight and natural sea breezes flow through the courtyard is breathtaking.",
    image: "/photos/imgi_10_project3.jpg",
    name: "Dr. Arvind Menon",
    role: "Private Villa Owner, Kochi",
  },
  {
    text: "Their material honesty and structural precision are unparalleled. From raw rammed earth to handcrafted timber joints, the execution was flawless.",
    image: "/photos/imgi_11_project4.jpg",
    name: "Vikram Singhania",
    role: "Managing Director, Nexus Spaces",
  },
  {
    text: "Building our boutique resort with TechPlus was a seamless experience. They preserved every ancient tree on site and created an ecologically sustainable sanctuary.",
    image: "/photos/imgi_14_project7.jpg",
    name: "Radhika Sharma",
    role: "Founder, Auralis Retreats Goa",
  },
  {
    text: "The 5-phase procedure gave us total clarity on cost, timelines, and material sourcing. Truly an international standard architectural atelier.",
    image: "/photos/imgi_2_baner9.jpg",
    name: "Rohit & Priya Nair",
    role: "Homeowners, Bangalore",
  },
  {
    text: "TechPlus designed our corporate headquarters with passive ventilation and acoustic serenity that boosted our team’s daily productivity and well-being.",
    image: "/photos/imgi_3_baner10.jpg",
    name: "Ananya Deshmukh",
    role: "Chief Executive, Element Labs",
  },
  {
    text: "Every space feels intimate yet expansive. Their minimalist philosophy paired with tropical climate adaptability is pure genius.",
    image: "/photos/imgi_4_baner1.jpg",
    name: "Siddharth Verma",
    role: "Creative Director, Studio 9",
  },
  {
    text: "The attention to tactile materiality—exposed concrete, black basalt, and natural stone—elevated our residence far beyond our highest expectations.",
    image: "/photos/imgi_4_project1.jpg",
    name: "Meera Krishnan",
    role: "Art Collector & Curator",
  },
  {
    text: "From concept sketch to handing over the keys, the discipline and design integrity TechPlus maintained was remarkable.",
    image: "/photos/imgi_5_baner5.jpg",
    name: "Karthik Nambiar",
    role: "Urban Developer, Calicut",
  },
  {
    text: "Our pavilion has won multiple regional architectural awards thanks to TechPlus’s visionary spatial balance and tectonic detailing.",
    image: "/photos/imgi_6_baner6.jpg",
    name: "Farhan Siddiqui",
    role: "Director, Horizon Hospitality",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-24 sm:py-32 border-t border-black/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-black/10 py-1.5 px-4 rounded-full bg-neutral-50 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase font-semibold">
              CLIENT TESTIMONIALS
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter text-[#141412] leading-[1.1]">
            What our clients say
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E6E65] font-light max-w-lg leading-relaxed">
            Experiences from homeowners, developers, and founders who have built their spatial vision with TechPlus.
          </p>
        </motion.div>

        {/* Continuous Smooth Infinite Scroll Columns with Gradient Mask */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={22} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={28} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={25} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
