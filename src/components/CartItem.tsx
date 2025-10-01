import React from 'react';
import { CartItem as CartItemType } from '../types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-200">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
        <p className="text-xs text-gray-500">
          {item.size} | {item.color}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {formatCurrency(item.price)}
        </p>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="text-gray-500 p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <Minus size={16} />
        </button>
        
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="text-gray-500 p-1 rounded-full hover:bg-gray-100"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="text-sm font-medium text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button 
          onClick={() => onRemoveItem(item.id)}
          className="mt-1 text-xs text-red-500 flex items-center hover:text-red-700"
        >
          <Trash2 size={14} className="mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;