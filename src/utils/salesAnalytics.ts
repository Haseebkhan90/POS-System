import { Sale, SalesSummary } from '../types';
import { format, parseISO, isWithinInterval, subDays } from 'date-fns';

export const calculateSalesSummary = (
  sales: Sale[],
  startDate?: string,
  endDate?: string
): SalesSummary => {
  // Filter sales by date range if provided
  let filteredSales = sales;
  if (startDate && endDate) {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    filteredSales = sales.filter(sale => {
      const saleDate = parseISO(sale.date);
      return isWithinInterval(saleDate, { start, end });
    });
  }

  // Calculate total sales and revenue
  const totalSales = filteredSales.length;
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  // Calculate top selling items
  const itemSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
  
  filteredSales.forEach(sale => {
    sale.items.forEach(item => {
      if (!itemSales[item.id]) {
        itemSales[item.id] = {
          name: item.name,
          quantity: 0,
          revenue: 0
        };
      }
      itemSales[item.id].quantity += item.quantity;
      itemSales[item.id].revenue += item.price * item.quantity;
    });
  });

  const topSellingItems = Object.entries(itemSales)
    .map(([productId, data]) => ({
      productId,
      name: data.name,
      quantity: data.quantity,
      revenue: data.revenue
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // Calculate sales by category
  const categorySales: Record<string, { count: number; revenue: number }> = {};
  
  filteredSales.forEach(sale => {
    sale.items.forEach(item => {
      if (!categorySales[item.category]) {
        categorySales[item.category] = { count: 0, revenue: 0 };
      }
      categorySales[item.category].count += item.quantity;
      categorySales[item.category].revenue += item.price * item.quantity;
    });
  });

  const salesByCategory = Object.entries(categorySales)
    .map(([category, data]) => ({
      category,
      count: data.count,
      revenue: data.revenue
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Calculate sales by date
  const dateSales: Record<string, { count: number; revenue: number }> = {};
  
  filteredSales.forEach(sale => {
    if (!dateSales[sale.date]) {
      dateSales[sale.date] = { count: 0, revenue: 0 };
    }
    dateSales[sale.date].count += 1;
    dateSales[sale.date].revenue += sale.total;
  });

  const salesByDate = Object.entries(dateSales)
    .map(([date, data]) => ({
      date,
      count: data.count,
      revenue: data.revenue
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalSales,
    totalRevenue,
    averageOrderValue,
    topSellingItems,
    salesByCategory,
    salesByDate
  };
};

export const generatePdfReport = (summary: SalesSummary, startDate?: string, endDate?: string) => {
  // This function will be implemented in the PDF generation component
};