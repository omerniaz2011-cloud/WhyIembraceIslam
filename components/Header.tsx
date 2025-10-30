import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-800 tracking-tight">
          Why Did I Embrace Islam?
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          Exploring personal stories of discovery and faith. These narratives reflect common themes and questions on the path to embracing Islam.
        </p>
      </div>
    </header>
  );
};

export default Header;