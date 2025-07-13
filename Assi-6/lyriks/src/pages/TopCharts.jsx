import React from 'react';

const TopCharts = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Top Charts</h2>

      <ol className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <li key={index} className="flex justify-between items-center p-4 bg-white shadow rounded">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
              <div>
                <p className="font-semibold">Song Title {index + 1}</p>
                <p className="text-sm text-gray-500">Artist Name</p>
              </div>
            </div>
            <span className="text-gray-400">#{index + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopCharts;
