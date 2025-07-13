import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="p-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search songs, artists..."
        className="w-full p-3 mb-6 border border-gray-300 rounded"
      />

      <h3 className="text-xl font-bold mb-4">Search Results for: "{query}"</h3>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white shadow rounded p-4">
            <div className="h-36 bg-gray-200 rounded mb-3"></div>
            <p className="font-semibold">Result {index + 1}</p>
            <p className="text-sm text-gray-500">Type: Song / Artist</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
