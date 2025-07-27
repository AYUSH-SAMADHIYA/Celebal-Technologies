
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import QuantitySelector from './QuantitySelector';
import { ICONS } from '../constants';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useAppContext();

  return (
    <div className="flex items-center justify-between p-4 bg-light-card/50 dark:bg-dark-card/50 rounded-lg backdrop-blur-sm animate-fadeIn">
      <div className="flex items-center space-x-4">
        <Link to={`/product/${item.id}`}>
          <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
        </Link>
        <div>
          <Link to={`/product/${item.id}`} className="font-semibold hover:text-primary transition-colors">{item.name}</Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <QuantitySelector 
          quantity={item.quantity}
          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
        />
        <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
          <ICONS.trash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
