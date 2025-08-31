import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { 
  PieChart as RechartsPie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { COLORS } from '../../utils/constants';
import { generateTrendData } from '../../utils/helpers';

/**
 * Product details page component
 * @param {Object} props 
 * @returns {JSX.Element}
 */
const ProductDetailsPage = ({ product, onBack }) => {
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500">Product not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const expenses = product.te + product.amazonFee;
  const netProfit = product.profit - expenses;
  
  const pieData = [
    { name: 'Net Profit', value: Math.max(netProfit, 0) },
    { name: 'TE', value: product.te },
    { name: 'Amazon Fee', value: product.amazonFee },
    { name: 'Credit', value: product.credit }
  ];

  const performanceData = [
    { metric: 'Revenue', value: product.sales, change: '+12%', trend: 'up' },
    { metric: 'Gross Profit', value: product.profit, change: '+8%', trend: 'up' },
    { metric: 'Net Profit', value: netProfit, change: '+5%', trend: 'up' },
    { metric: 'Profit Margin', value: `${product.profitPercentage}%`, change: '-2%', trend: 'down' }
  ];

  const trendData = generateTrendData(product);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <span>←</span>
                <span>Back to Dashboard</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.productName}</h1>
                <p className="text-gray-500">Product Analytics Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.metric}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof item.value === 'number' ? `${item.value.toLocaleString()}` : item.value}
                  </p>
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Breakdown Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </RechartsPie>
            </ResponsiveContainer>
          </div>

          {/* Performance Trend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()}`, '']} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Sales:</span>
                <span className="font-semibold text-gray-900">${product.sales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Gross Profit:</span>
                <span className="font-semibold text-green-600">${product.profit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Expenses (TE):</span>
                <span className="font-semibold text-red-600">${product.te.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Credit:</span>
                <span className="font-semibold text-blue-600">${product.credit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Amazon Fee:</span>
                <span className="font-semibold text-orange-600">${product.amazonFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Profit Percentage:</span>
                <span className="font-semibold text-purple-600">{product.profitPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;