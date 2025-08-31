import React, { useState } from 'react';
import { Package } from 'lucide-react';
import ShopifyDashboard from './ShopifyDashboard';

/**
 * Shopify integration setup component
 * @returns {JSX.Element}
 */
const ShopifyIntegration = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    apiKey: '',
    apiSecret: '',
    accessToken: ''
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  if (isConnected) {
    return <ShopifyDashboard />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Connect to Shopify</h2>
          <p className="text-gray-600 mt-2">
            Connect your Shopify store to sync your product data
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Name
            </label>
            <input
              type="text"
              name="shopName"
              required
              value={formData.shopName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="your-shop-name.myshopify.com"
              disabled={isConnecting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="text"
              name="apiKey"
              required
              value={formData.apiKey}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="Your Shopify API Key"
              disabled={isConnecting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Secret
            </label>
            <input
              type="password"
              name="apiSecret"
              required
              value={formData.apiSecret}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="Your Shopify API Secret"
              disabled={isConnecting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Token
            </label>
            <input
              type="password"
              name="accessToken"
              required
              value={formData.accessToken}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="Your Shopify Access Token"
              disabled={isConnecting}
            />
          </div>

          <button
            type="submit"
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect to Shopify'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Need help finding your credentials?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Go to your Shopify admin panel</li>
            <li>• Navigate to Apps → Manage private apps</li>
            <li>• Create a new private app or use existing one</li>
            <li>• Copy the API key and API secret key</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopifyIntegration;