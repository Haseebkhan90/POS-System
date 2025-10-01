import React, { useState } from 'react';
import { calculateSalesSummary } from '../utils/salesAnalytics';
import { generateSalesSummaryPDF } from '../utils/pdfGenerator';
import SalesSummaryChart from '../components/SalesSummaryChart';
import { Download, Calendar, Filter } from 'lucide-react';
import { format, subDays, parseISO } from 'date-fns';
import { useSales } from '../context/SalesContext';
import { formatCurrency } from '../utils/formatCurrency';

const SalesSummary: React.FC = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');
  
  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(today);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Get sales data from context
  const { sales } = useSales();
  
  // Calculate summary based on date range
  const summary = calculateSalesSummary(sales, startDate, endDate);
  
  // Handle PDF generation
  const handleDownloadPDF = () => {
    generateSalesSummaryPDF(summary, startDate, endDate);
  };
  
  // Apply date filter
  const applyFilter = () => {
    setFilterOpen(false);
  };
  
  // Predefined date ranges
  const setDateRange = (days: number) => {
    const end = new Date();
    const start = subDays(end, days);
    setStartDate(format(start, 'yyyy-MM-dd'));
    setEndDate(format(end, 'yyyy-MM-dd'));
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Summary</h1>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      
      {/* Date Filter Dropdown */}
      {filterOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Date Range</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setDateRange(7)}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
            >
              Last 7 days
            </button>
            <button
              onClick={() => setDateRange(30)}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
            >
              Last 30 days
            </button>
            <button
              onClick={() => setDateRange(90)}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
            >
              Last 90 days
            </button>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={applyFilter}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Sales</h3>
          <p className="text-3xl font-bold">{summary.totalSales}</p>
          <p className="text-sm text-gray-500 mt-2">
            {startDate} to {endDate}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold">{formatCurrency(summary.totalRevenue)}</p>
          <p className="text-sm text-gray-500 mt-2">
            {startDate} to {endDate}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Average Order Value</h3>
          <p className="text-3xl font-bold">{formatCurrency(summary.averageOrderValue)}</p>
          <p className="text-sm text-gray-500 mt-2">
            {startDate} to {endDate}
          </p>
        </div>
      </div>
      
      {/* Charts */}
      <SalesSummaryChart summary={summary} />
      
      {/* Top Selling Items Table */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Top Selling Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary.topSellingItems.map((item) => (
                <tr key={item.productId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((item.revenue / summary.totalRevenue) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Sales by Category Table */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary.salesByCategory.map((category) => (
                <tr key={category.category}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(category.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((category.revenue / summary.totalRevenue) * 100).toFixed(1)}%
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

export default SalesSummary;