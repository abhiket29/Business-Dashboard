import React from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPie, Cell } from 'recharts';
import MetricCard from '../ui/MetricCard';
import { COLORS } from '../../utils/constants';
import { getOrderStatusColor } from '../../utils/helpers';

/**
 * Shopify dashboard component
 * @returns {JSX.Element}
 */
const ShopifyDashboard = () => {
  const mockShopifyData = {
    totalRevenue: 324750,
    ordersToday: 89,
    conversionRate: 3.2,
    averageOrderValue: 127
  };

  const metricsData = [
    {
      title: 'Total Revenue',
      value: `$${mockShopifyData.totalRevenue.toLocaleString()}`,
      change: '+12% from last week',
      trend: 'up',
      icon: DollarSign,
      iconColor: 'green',
      valueColor: 'green'
    },
    {
      title: 'Orders Today',
      value: mockShopifyData.ordersToday,
      change: '+8% from yesterday',
      trend: 'up',
      icon: ShoppingBag,
      iconColor: 'blue',
      valueColor: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: `${mockShopifyData.conversionRate}%`,
      change: '+0.3% this month',
      trend: 'up',
      icon: TrendingUp,
      iconColor: 'purple',
      valueColor: 'purple'
    },
    {
      title: 'Avg Order Value',
      value: `$${mockShopifyData.averageOrderValue}`,
      change: '+$15 from last month',
      trend: 'up',
      icon: DollarSign,
      iconColor: 'orange',
      valueColor: 'orange'
    }
  ];

  const salesData = [
    { name: 'Mon', sales: 12000, orders: 45 },
    { name: 'Tue', sales: 15000, orders: 52 },
    { name: 'Wed', sales: 18000, orders: 63 },
    { name: 'Thu', sales: 14000, orders: 48 },
    { name: 'Fri', sales: 22000, orders: 78 },
    { name: 'Sat', sales: 25000, orders: 89 },
    { name: 'Sun', sales: 19000, orders: 67 }
  ];

  const trafficSources = [
    { name: 'Organic Search', value: 45 },
    { name: 'Social Media', value: 25 },
    { name: 'Direct', value: 20 },
    { name: 'Email', value: 10 }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 45000, units: 45 },
    { name: 'Samsung Galaxy S24', sales: 32000, units: 38 },
    { name: 'MacBook Air', sales: 28000, units: 14 },
    { name: 'AirPods Pro', sales: 18000, units: 72 },
    { name: 'iPad Pro', sales: 15000, units: 12 }
  ];

  const recentOrders = [
    { id: '#1001', customer: 'John Doe', product: 'iPhone 15', amount: 999, status: 'Fulfilled', date: '2024-01-28' },
    { id: '#1002', customer: 'Jane Smith', product: 'MacBook Pro', amount: 1999, status: 'Processing', date: '2024-01-28' },
    { id: '#1003', customer: 'Mike Johnson', product: 'AirPods Pro', amount: 249, status: 'Shipped', date: '2024-01-27' },
    { id: '#1004', customer: 'Sarah Wilson', product: 'iPad Pro', amount: 1099, status: 'Fulfilled', date: '2024-01-27' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Shopify Store Dashboard</h2>
        <p className="text-green-100">Connected to: Demo Tech Store</p>
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

      {/* Sales Chart and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'sales' ? `$${value.toLocaleString()}` : value,
                name === 'sales' ? 'Sales' : 'Orders'
              ]} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} name="Sales ($)" />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.units} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${product.sales.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources and Store Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie
              data={trafficSources}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {trafficSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </RechartsPie>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Page Views</span>
              <span className="font-semibold">15,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Unique Visitors</span>
              <span className="font-semibold">8,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bounce Rate</span>
              <span className="font-semibold">34.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Session Duration</span>
              <span className="font-semibold">3m 45s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-semibold text-green-600">4.8/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Shopify Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
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
                    {order.customer}
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

export default ShopifyDashboard;