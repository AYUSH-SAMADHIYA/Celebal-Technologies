
import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center">
      <button onClick={onDecrease} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-l-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">-</button>
      <span className="px-4 py-1 bg-light-card dark:bg-dark-card border-t border-b border-gray-200 dark:border-gray-700">{quantity}</span>
      <button onClick={onIncrease} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">+</button>
    </div>
  );
};

export default QuantitySelector;
