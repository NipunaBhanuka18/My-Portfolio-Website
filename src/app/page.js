'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero3D from '@/components/Hero3D';
import NavigationDock from '@/components/NavigationDock';
import WindowOverlay from '@/components/WindowOverlay';

export default function Home() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <main style={{ height: '100dvh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <Hero3D />
      
      <AnimatePresence mode="wait">
        {activeTab && (
          <WindowOverlay activeTab={activeTab} onClose={() => setActiveTab(null)} />
        )}
      </AnimatePresence>

      <NavigationDock activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
