import React from 'react';

const TopArtist = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Top Artists</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
            <p className="text-center font-medium">Artist {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
