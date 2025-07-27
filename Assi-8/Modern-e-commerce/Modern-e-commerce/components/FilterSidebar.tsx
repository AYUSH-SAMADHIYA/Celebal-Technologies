
import React from 'react';
import { CATEGORIES } from '../constants';

interface FilterSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  maxPrice: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ selectedCategories, setSelectedCategories, priceRange, setPriceRange, maxPrice }) => {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <aside className="w-full lg:w-64 xl:w-72 p-6 bg-light-card/50 dark:bg-dark-card/50 rounded-lg shadow-lg backdrop-blur-sm animate-fadeIn">
      <h3 className="text-xl font-bold mb-6">Filters</h3>
      
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-3 text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mt-8">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-4">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary"
            />
            <div className="flex justify-between text-sm">
                <span>$0</span>
                <span>${priceRange}</span>
            </div>
        </div>
      </div>
      
    </aside>
  );
};

export default FilterSidebar;
