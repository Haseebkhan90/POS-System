import { Sale } from '../types';
import { format, subDays } from 'date-fns';

// Generate some sample sales data for the past 30 days
export const generateSalesData = (): Sale[] => {
  const sales: Sale[] = [];
  
  // Sample payment methods
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment'];
  
  // Generate 50 random sales
  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');
    
    // Random number of items (1-5)
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items = [];
    
    let total = 0;
    
    // Generate random items for this sale
    for (let j = 0; j < itemCount; j++) {
      const productId = Math.floor(Math.random() * 10) + 1;
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = (Math.random() * 100 + 10).toFixed(2);
      
      // Check if this product is already in the cart
      const existingItemIndex = items.findIndex(item => item.id === productId.toString());
      
      if (existingItemIndex >= 0) {
        // Increase quantity of existing item
        items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        items.push({
          id: productId.toString(),
          name: `Product ${productId}`,
          category: ['T-Shirts', 'Jeans', 'Dresses', 'Hoodies', 'Jackets'][Math.floor(Math.random() * 5)],
          price: parseFloat(price),
          size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)],
          color: ['Black', 'White', 'Blue', 'Red', 'Gray'][Math.floor(Math.random() * 5)],
          imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          stock: Math.floor(Math.random() * 20) + 5,
          quantity: quantity
        });
      }
      
      total += parseFloat(price) * quantity;
    }
    
    // Create the sale object
    sales.push({
      id: `SALE-${1000 + i}`,
      items: items,
      total: parseFloat(total.toFixed(2)),
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      date: date,
      customerName: Math.random() > 0.3 ? `Customer ${i + 1}` : undefined
    });
  }
  
  return sales;
};

export const salesData = generateSalesData();