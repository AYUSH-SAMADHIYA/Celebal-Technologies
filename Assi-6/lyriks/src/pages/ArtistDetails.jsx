import React from 'react';

const ArtistDetail = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-48 h-48 bg-gray-300 rounded-full"></div>
        <div>
          <h2 className="text-4xl font-bold">Artist Name</h2>
          <p className="text-gray-500 mt-2">Genre · Country</p>
          <p className="mt-4 max-w-xl">This is a short biography or description of the artist. It gives listeners a glimpse into their journey, influences, and style.</p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-10 mb-4">Popular Songs</h3>
      <ul className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between">
            <span>Song {index + 1}</span>
            <span>3:{30 + index}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistDetail;
