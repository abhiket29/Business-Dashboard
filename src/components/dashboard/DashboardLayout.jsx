import React from 'react';
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
  onLogout, 
  onProductSelect, 
  sidebarTab, 
  onSidebarTabChange 
}) => {
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
        onLogout={onLogout}
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