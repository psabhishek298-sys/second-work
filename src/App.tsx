import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { PortfolioPage } from './pages/Portfolio';
import { ProjectDetailsPage } from './pages/ProjectDetails';
import { ProcedurePage } from './pages/Procedure';
import { ContactPage } from './pages/Contact';
import { NotFoundPage } from './pages/NotFound';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailsPage />} />
          <Route path="/procedure" element={<ProcedurePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
