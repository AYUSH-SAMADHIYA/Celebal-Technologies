
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { cart, getCartTotal, getCartItemCount } = useAppContext();
  const cartTotal = getCartTotal();
  const cartItemCount = getCartItemCount();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
          Explore Purchase
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart ({cartItemCount} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-light-card/50 dark:bg-dark-card/50 rounded-lg shadow-lg backdrop-blur-sm sticky top-24">
            <h2 className="text-xl font-bold mb-4"> Bill</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-3 font-bold text-base">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
