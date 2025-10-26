import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-peach-50">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/c1w2QYixcPkptHWE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay for readability without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/90" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 text-center md:pt-32">
        <span className="mb-3 inline-flex items-center rounded-full border border-rose-200 bg-white/80 px-3 py-1 text-xs font-medium text-rose-600 shadow-sm backdrop-blur">
          Premium product visuals for ecommerce
        </span>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
          Make every product look premium
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
          Clean, aesthetic, studio-like images with a crisp white background. Designed for beauty, lifestyle, and modern storefronts.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#editor"
            className="rounded-full bg-gray-900 px-6 py-3 text-white shadow-lg transition hover:shadow-xl"
          >
            Try the editor
          </a>
          <a
            href="#features"
            className="rounded-full bg-white px-6 py-3 text-gray-900 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
          >
            See features
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
