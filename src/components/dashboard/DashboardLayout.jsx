import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import ChatbotTab from '../tabs/ChatbotTab';
import ProfitTab from '../tabs/ProfitTab';
import AmazonIntegration from '../integrations/AmazonIntegration';
import ShopifyIntegration from '../integrations/ShopifyIntegration';
import { SIDEBAR_ITEMS } from '../../utils/constants';
import { calculateTotal } from '../../utils/helpers';

/**
 * Main dashboard layout component
 * @param {Object} props 
 * @returns {JSX.Element}
 */
const DashboardLayout = ({ 
  user, 
  data, 
  onProductSelect, 
  sidebarTab, 
  onSidebarTabChange 
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // The App component will handle the navigation automatically
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const totalSales = calculateTotal(data, 'sales');
  const totalProfit = calculateTotal(data, 'profit');
  const totalExpenses = data.reduce((sum, item) => sum + (item.te + item.amazonFee), 0);

  const renderMainContent = () => {
    switch (sidebarTab) {
      case 'dashboard':
        return <DashboardContent data={data} onProductSelect={onProductSelect} />;
      case 'chatbot':
        return <ChatbotTab />;
      case 'profit':
        return <ProfitTab data={data} />;
      case 'amazon':
        return <AmazonIntegration />;
      case 'shopify':
        return <ShopifyIntegration />;
      case 'analytics':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Analytics</h3>
            <p className="text-gray-600">Analytics features coming soon...</p>
          </div>
        );
      case 'products':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            {data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name || `Product ${index + 1}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.category || 'No category'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => onProductSelect(item)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No products available.</p>
                <p className="text-sm text-gray-400 mt-2">Upload a CSV file to add products.</p>
              </div>
            )}
          </div>
        );
      default:
        return <DashboardContent data={data} onProductSelect={onProductSelect} />;
    }
  };

  const getCurrentPageTitle = () => {
    const currentItem = SIDEBAR_ITEMS.find(item => item.id === sidebarTab);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        user={user}
        activeTab={sidebarTab}
        onTabChange={onSidebarTabChange}
        onLogout={handleLogout}
        sidebarItems={SIDEBAR_ITEMS}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {getCurrentPageTitle()}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-6 bg-gray-50 px-4 py-2 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-lg font-bold text-green-600">
                    ${totalSales.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Profit</p>
                  <p className="text-lg font-bold text-blue-600">
                    ${totalProfit.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Expenses</p>
                  <p className="text-lg font-bold text-red-600">
                    ${totalExpenses.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;