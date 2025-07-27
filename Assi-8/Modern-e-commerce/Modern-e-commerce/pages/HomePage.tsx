
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getFeaturedProducts } from '../services/mockApi';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center py-20 lg:py-32 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500 via-green-800 to-purple-500 animate-fadeIn">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            India's Ki Apni Dukaan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            Unbeatable prices, unmatched quality. Explore our curated collection of modern essentials.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block bg-white text-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all transform hover:scale-105 animate-slideInUp" style={{ animationDelay: '0.6s' }}
          >
            Shop Hoppp
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Best Sellers</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-light-card dark:bg-dark-card rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} view="grid" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
