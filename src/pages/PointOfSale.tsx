import React, { useState } from 'react';
import { products } from '../data/products';
import { CartItem, Product } from '../types';
import ProductCard from '../components/ProductCard';
import CartItemComponent from '../components/CartItem';
import { Search, X, CreditCard, DollarSign, Smartphone } from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { format } from 'date-fns';
import { formatCurrency } from '../utils/formatCurrency';

const PointOfSale: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Get the addSale function from context
  const { addSale } = useSales();
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });
  
  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  // Update item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  // Handle payment
  const handlePayment = (paymentMethod: string) => {
    // Create a new sale object
    const newSale = {
      id: `SALE-${Date.now()}`,
      items: [...cart],
      total: cartTotal * 1.07, // Including tax
      paymentMethod,
      date: format(new Date(), 'yyyy-MM-dd')
    };
    
    // Add the sale to the context
    addSale(newSale);
    
    // Show success message and reset cart
    setPaymentSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setCart([]);
      setShowPaymentModal(false);
      setPaymentSuccess(false);
    }, 3000);
  };
  
  return (
    <div className="flex h-full">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Point of Sale</h1>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              categoryFilter === null
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Items
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                categoryFilter === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found. Try a different search term or category.</p>
          </div>
        )}
      </div>
      
      {/* Cart Section */}
      <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <p className="text-gray-500 text-sm">{cart.length} items</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add items to get started</p>
            </div>
          ) : (
            cart.map(item => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Tax (7%)</span>
            <span className="font-medium">{formatCurrency(cartTotal * 0.07)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>{formatCurrency(cartTotal * 1.07)}</span>
          </div>
          
          <button
            onClick={() => setShowPaymentModal(true)}
            disabled={cart.length === 0}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Payment</h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {paymentSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-4">Your order has been processed.</p>
                  <p className="text-sm text-gray-500">Redirecting to POS...</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">Total Amount</p>
                  <p className="text-3xl font-bold mb-6">{formatCurrency(cartTotal * 1.07)}</p>
                  
                  <p className="text-gray-600 mb-4">Select Payment Method</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handlePayment('Cash')}
                      className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <DollarSign className="text-green-600" size={24} />
                      <span className="ml-3 font-medium">Cash</span>
                    </button>
                    
                    <button
                      onClick={() => handlePayment('Credit Card')}
                      className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <CreditCard className="text-blue-600" size={24} />
                      <span className="ml-3 font-medium">Credit Card</span>
                    </button>
                    
                    <button
                      onClick={() => handlePayment('Mobile Payment')}
                      className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Smartphone className="text-purple-600" size={24} />
                      <span className="ml-3 font-medium">Mobile Payment</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointOfSale;