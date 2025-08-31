import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import AmazonDashboard from './AmazonDasboard'

/**
 * Amazon integration setup component
 * @returns {JSX.Element}
 */
const AmazonIntegration = () => {
  const [formData, setFormData] = useState({
    sellerEmail: '',
    storeName: '',
    marketplaceId: '',
    accessKey: ''
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
    return <AmazonDashboard />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Connect to Amazon</h2>
          <p className="text-gray-600 mt-2">
            Connect your Amazon Seller account to sync your product data
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seller Email
            </label>
            <input
              type="email"
              name="sellerEmail"
              required
              value={formData.sellerEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="your-seller-email@example.com"
              disabled={isConnecting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <input
              type="text"
              name="storeName"
              required
              value={formData.storeName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Your Amazon Store Name"
              disabled={isConnecting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marketplace ID
            </label>
            <input
              type="text"
              name="marketplaceId"
              required
              value={formData.marketplaceId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="ATVPDKIKX0DER"
              disabled={isConnecting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Key
            </label>
            <input
              type="password"
              name="accessKey"
              required
              value={formData.accessKey}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Your Amazon MWS Access Key"
              disabled={isConnecting}
            />
          </div>

          <button
            type="submit"
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect to Amazon'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Need help finding your credentials?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Go to your Amazon Seller Central account</li>
            <li>• Navigate to Settings → User Permissions</li>
            <li>• Generate or retrieve your MWS credentials</li>
            <li>• Copy the required information to the form above</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AmazonIntegration;