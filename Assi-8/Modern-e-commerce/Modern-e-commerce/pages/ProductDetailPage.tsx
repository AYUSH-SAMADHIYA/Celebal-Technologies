
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { getProductById } from '../services/mockApi';
import { useAppContext } from '../hooks/useAppContext';
import QuantitySelector from '../components/QuantitySelector';
import { ICONS } from '../constants';

const StarRating: React.FC<{ rating: number, reviewCount: number }> = ({ rating, reviewCount }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <ICONS.star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`} />
      ))}
    </div>
    <span className="text-sm text-gray-500 dark:text-gray-400">{rating.toFixed(1)} ({reviewCount} reviews)</span>
  </div>
);


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await getProductById(Number(id));
          if (fetchedProduct) {
            setProduct(fetchedProduct);
            setMainImage(fetchedProduct.images[0]);
          }
        } catch (error) {
          console.error("Failed to fetch product:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-light-card/30 dark:bg-dark-card/30 rounded-2xl backdrop-blur-md animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
            <img src={mainImage || ''} alt={product.name} className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-full h-24 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase text-primary">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold my-2">{product.name}</h1>
          <div className="my-3">
             <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <p className="text-light-text/80 dark:text-dark-text/80 my-4 text-base leading-relaxed">{product.description}</p>
          
          <div className="my-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className={`mt-2 text-sm font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(q => Math.min(q + 1, product.stock))}
              onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
            />
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
