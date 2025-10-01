export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  color: string;
  imageUrl: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  date: string;
  customerName?: string;
}

export interface SalesSummary {
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  topSellingItems: {
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];
  salesByCategory: {
    category: string;
    count: number;
    revenue: number;
  }[];
  salesByDate: {
    date: string;
    count: number;
    revenue: number;
  }[];
}

// Context type for sales data
export interface SalesContextType {
  sales: Sale[];
  addSale: (sale: Sale) => void;
}