import React from "react";
import { motion } from "framer-motion";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-8 rounded-3xl border border-neutral-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-neutral-300 transition-all max-w-xs w-full"
                  key={i}
                >
                  <div className="text-sm text-neutral-700 leading-relaxed font-sans font-normal">&ldquo;{text}&rdquo;</div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-neutral-200"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm tracking-tight leading-5 text-[#141412]">{name}</div>
                      <div className="text-xs text-[#9B9B90] leading-5 tracking-tight font-mono">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
