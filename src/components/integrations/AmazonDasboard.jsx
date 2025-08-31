import React from 'react';
import { DollarSign, ShoppingBag, TrendingUp, TrendingDown, Package } from 'lucide-react';
import MetricCard from '../ui/MetricCard';
import { getOrderStatusColor } from '../../utils/helpers';

/**
 * Amazon dashboard component
 * @returns {JSX.Element}
 */
const AmazonDashboard = () => {
  const mockAmazonData = {
    totalSales: 458200,
    ordersToday: 127,
    returnsRate: 2.3,
    inventoryAlerts: 8
  };

  const metricsData = [
    {
      title: 'Total Sales',
      value: `$${mockAmazonData.totalSales.toLocaleString()}`,
      change: '+12% from last week',
      trend: 'up',
      icon: DollarSign,
      iconColor: 'green',
      valueColor: 'green'
    },
    {
      title: 'Orders Today',
      value: mockAmazonData.ordersToday,
      change: '+8% from yesterday',
      trend: 'up',
      icon: ShoppingBag,
      iconColor: 'blue',
      valueColor: 'blue'
    },
    {
      title: 'Returns Rate',
      value: `${mockAmazonData.returnsRate}%`,
      change: '-0.5% this month',
      trend: 'down',
      icon: TrendingDown,
      iconColor: 'yellow',
      valueColor: 'yellow'
    },
    {
      title: 'Inventory Alerts',
      value: mockAmazonData.inventoryAlerts,
      change: '3 new alerts',
      trend: 'up',
      icon: Package,
      iconColor: 'red',
      valueColor: 'red'
    }
  ];

  const recentOrders = [
    { id: 'AMZ-001', product: 'iPhone 15', amount: 999, status: 'Shipped', date: '2024-01-28' },
    { id: 'AMZ-002', product: 'Samsung Galaxy S24', amount: 849, status: 'Processing', date: '2024-01-28' },
    { id: 'AMZ-003', product: 'MacBook Pro', amount: 1999, status: 'Delivered', date: '2024-01-27' },
    { id: 'AMZ-004', product: 'iPad Pro', amount: 1099, status: 'Shipped', date: '2024-01-27' },
    { id: 'AMZ-005', product: 'AirPods Pro', amount: 249, status: 'Processing', date: '2024-01-26' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Amazon Seller Dashboard</h2>
        <p className="text-orange-100">Connected to: Demo Electronics Store</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Amazon Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ${order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      getOrderStatusColor(order.status)
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
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

export default AmazonDashboard;