import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Sale, SalesContextType } from '../types';
import { salesData } from '../data/sales';

// Create the context with a default value
const SalesContext = createContext<SalesContextType>({
  sales: [],
  addSale: () => {},
});

// Custom hook to use the sales context
export const useSales = () => useContext(SalesContext);

// Provider component
export const SalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sales, setSales] = useState<Sale[]>(salesData);

  // Function to add a new sale
  const addSale = (sale: Sale) => {
    setSales(prevSales => [...prevSales, sale]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};