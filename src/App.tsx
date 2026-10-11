/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { SolarInstallationPage } from './pages/SolarInstallationPage';
import { SolarMaintenancePage } from './pages/SolarMaintenancePage';
import { SolarCleaningPage } from './pages/SolarCleaningPage';
import { SolarSupplyPage } from './pages/SolarSupplyPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BudgetCalculatorPage } from './pages/BudgetCalculatorPage';
import { SolarEstimatorPage } from './pages/SolarEstimatorPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesOverviewPage />;
      case '/services/installation':
        return <SolarInstallationPage />;
      case '/services/maintenance':
        return <SolarMaintenancePage />;
      case '/services/cleaning':
        return <SolarCleaningPage />;
      case '/services/supply':
        return <SolarSupplyPage />;
      case '/products':
        return <ProductsPage />;
      case '/projects':
        return <ProjectsPage />;
      case '/budget-calculator':
        return <BudgetCalculatorPage />;
      case '/solar-estimator':
        return <SolarEstimatorPage />;
      case '/contact':
        return <ContactPage />;
      default:
        // Default fallback to HomePage if unknown
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#10243A] antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
