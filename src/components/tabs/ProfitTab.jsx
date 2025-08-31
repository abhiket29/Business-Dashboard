import React from 'react';
import { TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MetricCard from '../ui/MetricCard';
import { calculateTotal, calculateAverage, getProfitStatusColor } from '../../utils/helpers';

/**
 * Profit analysis tab component
 * @param {Object} props 
 * @returns {JSX.Element}
 */
const ProfitTab = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-xl text-gray-500">No data available for profit analysis</p>
          <p className="text-gray-400 mt-2">Upload your product data to see profit insights</p>
        </div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.profit - a.profit);
  const totalProfit = calculateTotal(data, 'profit');
  const averageProfitMargin = calculateAverage(data, 'profitPercentage');
  const highestProfit = Math.max(...data.map(p => p.profit));
  
  const profitData = sortedData.map(item => ({
    name: item.productName,
    profit: item.profit,
    profitPercentage: item.profitPercentage,
    expenses: item.te + item.amazonFee
  }));

  const metricsData = [
    {
      title: 'Highest Profit',
      value: `$${highestProfit.toLocaleString()}`,
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      iconColor: 'green',
      valueColor: 'green'
    },
    {
      title: 'Average Profit Margin',
      value: `${averageProfitMargin.toFixed(1)}%`,
      change: '+1.2%',
      trend: 'up',
      icon: PieChart,
      iconColor: 'blue',
      valueColor: 'blue'
    },
    {
      title: 'Total Profit',
      value: `$${totalProfit.toLocaleString()}`,
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      iconColor: 'purple',
      valueColor: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricsData.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            iconColor={metric.iconColor}
            valueColor={metric.valueColor}
          />
        ))}
      </div>

      {/* Profit Analysis Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit vs Expenses Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
            <Legend />
            <Bar dataKey="profit" fill="#00C49F" name="Profit" />
            <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Profit Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Profit Analysis by Product</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expenses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Profit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((product, index) => {
                const expenses = product.te + product.amazonFee;
                const netProfit = product.profit - expenses;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                        index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                      ${product.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        getProfitStatusColor(product.profitPercentage)
                      }`}>
                        {product.profitPercentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600">
                      ${expenses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <span className={netProfit > 0 ? 'text-green-600' : 'text-red-600'}>
                        ${netProfit.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitTab;