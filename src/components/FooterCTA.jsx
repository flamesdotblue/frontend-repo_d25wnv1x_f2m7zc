import React from 'react';

const FooterCTA = () => {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 p-8 text-center ring-1 ring-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 md:text-3xl">Elevate your storefront visuals</h3>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600">
          Deliver clean, consistent product images with premium white backgrounds and aesthetic styling.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="#editor" className="rounded-full bg-gray-900 px-6 py-3 text-white shadow-lg">Open the editor</a>
          <a
            href="#features"
            className="rounded-full bg-white px-6 py-3 text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
          >
            Explore features
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} Premium Shots. All rights reserved.</p>
    </footer>
  );
};

export default FooterCTA;
