import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SalesSummary } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface SalesSummaryChartProps {
  summary: SalesSummary;
}

const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#d35400'];

const SalesSummaryChart: React.FC<SalesSummaryChartProps> = ({ summary }) => {
  // Format data for the category pie chart
  const categoryData = summary.salesByCategory.map((category, index) => ({
    name: category.category,
    value: category.revenue,
    color: COLORS[index % COLORS.length]
  }));

  // Format data for the top selling items bar chart
  const topItemsData = summary.topSellingItems.map(item => ({
    name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
    quantity: item.quantity,
    revenue: parseFloat(item.revenue.toFixed(2))
  }));

  // Custom tooltip formatter for currency
  const currencyFormatter = (value: number) => formatCurrency(value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Top Selling Items</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topItemsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "Revenue ($)") {
                  return [currencyFormatter(value as number), "Revenue"];
                }
                return [value, name];
              }}
            />
            <Legend />
            <Bar dataKey="quantity" name="Quantity Sold" fill="#3498db" />
            <Bar dataKey="revenue" name="Revenue" fill="#2ecc71" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => currencyFormatter(value as number)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesSummaryChart;