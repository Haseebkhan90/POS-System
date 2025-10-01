import React from 'react';
import { calculateSalesSummary } from '../utils/salesAnalytics';
import { ShoppingBag, DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import SalesSummaryChart from '../components/SalesSummaryChart';
import { format, subDays } from 'date-fns';
import { useSales } from '../context/SalesContext';
import { formatCurrency } from '../utils/formatCurrency';

const Dashboard: React.FC = () => {
  // Get sales data from context
  const { sales } = useSales();
  
  // Calculate summary for the last 30 days
  const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const today = format(new Date(), 'yyyy-MM-dd');
  const summary = calculateSalesSummary(sales, thirtyDaysAgo, today);

  // Calculate recent sales (last 5)
  const recentSales = [...sales]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <ShoppingBag size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold">{summary.totalSales}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <DollarSign size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <CreditCard size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <h3 className="text-2xl font-bold">{formatCurrency(summary.averageOrderValue)}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <TrendingUp size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Top Category</p>
              <h3 className="text-2xl font-bold">
                {summary.salesByCategory[0]?.category || 'N/A'}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <SalesSummaryChart summary={summary} />
      
      {/* Recent Sales */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.items.length} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {formatCurrency(sale.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;