import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import UploadPage from './components/pages/UploadPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProductDetailsPage from './components/pages/ProductDetailsPage';
import { useAuth } from './hooks/useAuth';

/**
 * Main App component with Firebase authentication and routing logic
 * @returns {JSX.Element}
 */
function App() {
  const { user, loading, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarTab, setSidebarTab] = useState('dashboard');

  // Handle page navigation based on auth state
  useEffect(() => {
    if (isAuthenticated && currentPage === 'login') {
      setCurrentPage('upload');
    } else if (!isAuthenticated && currentPage !== 'login') {
      setCurrentPage('login');
      // Reset state when user logs out
      setUploadedData([]);
      setSelectedProduct(null);
      setSidebarTab('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  const handleFileUpload = (data) => {
    setUploadedData(data);
    setCurrentPage('dashboard');
    setSidebarTab('dashboard');
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedProduct(null);
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    if (!isAuthenticated) {
      return <LoginPage />;
    }

    switch (currentPage) {
      case 'upload':
        return <UploadPage onUpload={handleFileUpload} />;
      case 'dashboard':
        return (
          <DashboardLayout 
            user={user}
            data={uploadedData}
            onProductSelect={handleProductSelect}
            sidebarTab={sidebarTab}
            onSidebarTabChange={setSidebarTab}
          />
        );
      case 'product-details':
        return (
          <ProductDetailsPage 
            product={selectedProduct}
            onBack={handleBackToDashboard}
          />
        );
      default:
        return <UploadPage onUpload={handleFileUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
    </div>
  );
}

export default App;