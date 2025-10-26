import React from 'react';

const features = [
  {
    title: 'Pristine white backgrounds',
    desc: 'Create clean, consistent white backgrounds that make your products pop and feel premium.',
  },
  {
    title: 'Aesthetic presets',
    desc: 'Soft shadows, tasteful padding, and subtle reflections designed for ecommerce storefronts.',
  },
  {
    title: 'Banana-ready API',
    desc: 'Built to integrate with Banana for GPU-accelerated background cleanup and enhancements.',
  },
  {
    title: 'One-click export',
    desc: 'Download high-resolution PNGs tailored for marketplaces and product detail pages.',
  },
];

const FeatureGrid = () => {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Made for aesthetic ecommerce</h2>
        <p className="mt-3 text-gray-600">Everything you need to elevate product shots into premium visuals.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
