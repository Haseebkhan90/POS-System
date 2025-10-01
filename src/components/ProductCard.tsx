import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 text-sm">{product.category}</span>
          <span className="text-indigo-600 font-bold">{formatCurrency(product.price)}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>Size: {product.size}</span>
          <span>Color: {product.color}</span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-indigo-600 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;