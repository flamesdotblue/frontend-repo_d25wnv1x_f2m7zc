import React from 'react';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import ImageEditor from './components/ImageEditor';
import FooterCTA from './components/FooterCTA';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <FeatureGrid />
      <ImageEditor />
      <FooterCTA />
    </div>
  );
}

export default App;
