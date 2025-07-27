
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import { getProducts } from '../services/mockApi';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { ICONS } from '../constants';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(500);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const maxPrice = useMemo(() => {
      if(products.length === 0) return 500;
      return Math.max(...products.map(p => p.price));
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
        setPriceRange(Math.max(...allProducts.map(p => p.price)));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(product => 
        selectedCategories.length === 0 || selectedCategories.includes(product.category)
      )
      .filter(product =>
        product.price <= priceRange
      );
  }, [products, searchTerm, selectedCategories, priceRange]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters */}
      <div className="w-full lg:w-1/4">
        <FilterSidebar 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice}
        />
      </div>

      {/* Products Grid */}
      <div className="w-full lg:w-3/4">
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="flex items-center space-x-2 p-1 bg-light-card/60 dark:bg-dark-card/60 rounded-full backdrop-blur-sm">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-full transition-colors ${view === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              aria-label="Grid view"
            >
              <ICONS.grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-full transition-colors ${view === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              aria-label="List view"
            >
              <ICONS.list className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-light-card dark:bg-dark-card rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} view={view} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">Oopss your request is not available</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
