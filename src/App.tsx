/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { Dashboard } from './components/Dashboard';

function MainLayout() {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-primary text-primary flex flex-col font-sans">
      <Navbar />
      {viewMode === 'landing' ? <LandingHero /> : <Dashboard />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
