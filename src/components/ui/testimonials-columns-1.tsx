import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface TestimonialItem {
  id?: string;
  text?: string;
  quote?: string;
  image?: string;
  avatar?: string;
  name: string;
  role?: string;
  location?: string;
  rating?: number;
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
          duration: props.duration || 18,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map((item, i) => {
                const text = item.quote || item.text || "";
                const rating = item.rating || 5;
                const roleOrLoc = item.location || item.role || "Verified Google Review";

                return (
                  <div
                    className="p-7 rounded-[28px] border border-neutral-200/80 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-neutral-300 transition-all max-w-[340px] sm:max-w-[360px] w-full flex flex-col justify-between"
                    key={`${index}-${i}`}
                  >
                    <div>
                      {/* Rating Stars & Google badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, s) => (
                            <Star key={s} size={14} className="fill-[#F4B400] text-[#F4B400]" />
                          ))}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-black/5 text-[10px] font-mono font-medium text-neutral-600">
                          <svg className="w-3 h-3" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                          <span>Review</span>
                        </div>
                      </div>

                      {/* Review text */}
                      <p className="text-[13px] text-neutral-700 leading-relaxed font-sans font-normal">
                        &ldquo;{text}&rdquo;
                      </p>
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-100">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a18] text-white font-mono text-xs flex items-center justify-center uppercase flex-shrink-0 font-medium shadow-sm">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="font-medium text-[13px] tracking-tight text-[#141412] truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#9B9B90] tracking-tight font-mono truncate">
                          {roleOrLoc}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
