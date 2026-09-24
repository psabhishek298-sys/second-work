import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { ScrollProgress } from '../components/ScrollProgress/ScrollProgress';
import { useLenis } from '../hooks/useLenis';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useLenis();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black relative">
      {/* Top minimal scroll progress line */}
      <ScrollProgress />

      {/* Global transparent floating navigation */}
      <Navbar />

      {/* Page Content with key for route transitions */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <React.Fragment key={location.pathname}>
            {children}
          </React.Fragment>
        </AnimatePresence>
      </main>

      {/* Minimal Architectural Footer */}
      <Footer />
    </div>
  );
};
