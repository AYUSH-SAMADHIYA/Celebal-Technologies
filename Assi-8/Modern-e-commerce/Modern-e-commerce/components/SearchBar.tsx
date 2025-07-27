
import React from 'react';
import { ICONS } from '../constants';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder = 'Search for products...' }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-full bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <ICONS.search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
