import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageTransition } from '../../components/PageTransition/PageTransition';
import { MagneticButton } from '../../components/MagneticButton/MagneticButton';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <span className="font-mono text-xs tracking-widest text-[#9B9B90] uppercase mb-4">
          404 &bull; VOID SPACE
        </span>
        <h1 className="font-display text-5xl sm:text-7xl font-light text-[#141412] mb-4">
          Space Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E65] max-w-md mb-8">
          The architectural plan or spatial coordinates you are seeking do not exist or have been archived.
        </p>
        <MagneticButton strength={0.3}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#141412] text-white font-mono text-xs tracking-widest uppercase hover:bg-black transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO ATELIER HOME
          </Link>
        </MagneticButton>
      </section>
    </PageTransition>
  );
};
