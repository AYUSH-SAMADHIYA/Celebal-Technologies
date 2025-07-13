import React from 'react';

const AroundYou = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Around You</h2>
      <p className="text-gray-500 mb-6">Discover trending music in your area.</p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <h3 className="font-semibold text-lg">Track {index + 1}</h3>
            <p className="text-sm text-gray-500">Artist Name</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
