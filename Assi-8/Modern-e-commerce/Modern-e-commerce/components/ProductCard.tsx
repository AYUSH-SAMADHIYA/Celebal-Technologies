
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { ICONS } from '../constants';

interface ProductCardProps {
  product: Product;
  view: 'grid' | 'list';
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <ICONS.star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`} />
    ))}
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, view }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (view === 'list') {
    return (
      <div className="flex flex-col md:flex-row items-center bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full animate-fadeIn">
        <Link to={`/product/${product.id}`} className="w-full md:w-1/4 flex-shrink-0">
          <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        </Link>
        <div className="w-full md:w-3/4 md:pl-6 mt-4 md:mt-0">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl font-bold hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
          <div className="flex items-center my-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-sm text-light-text/80 dark:text-dark-text/80 my-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <button onClick={handleAddToCart} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light-card dark:bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group animate-fadeIn">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" src={product.images[0]} alt={product.name} />
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 m-2 rounded-full">
            {product.originalPrice && `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{product.category}</p>
          <h3 className="text-lg font-semibold truncate mt-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <div className="flex items-center my-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({product.reviewCount})</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
                {product.originalPrice && <p className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>}
            </div>
          </div>
        </div>
      </Link>
       <div className="p-4 pt-0">
         <button onClick={handleAddToCart} className="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add to Cart
          </button>
       </div>
    </div>
  );
};

export default ProductCard;
