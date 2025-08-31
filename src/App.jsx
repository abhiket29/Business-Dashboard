import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import UploadPage from './components/pages/UploadPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProductDetailsPage from './components/pages/ProductDetailsPage';
import { useAuth } from './hooks/useAuth';

/**
 * Main App component with routing logic
 * @returns {JSX.Element}
 */
function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarTab, setSidebarTab] = useState('dashboard');

  // Handle page navigation based on auth state
  useEffect(() => {
    if (isAuthenticated && currentPage === 'login') {
      setCurrentPage('upload');
    } else if (!isAuthenticated) {
      setCurrentPage('login');
      // Reset state when user logs out
      setUploadedData([]);
      setSelectedProduct(null);
      setSidebarTab('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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

  const renderCurrentPage = () => {
    if (!isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'upload':
        return <UploadPage onUpload={handleFileUpload} />;
      case 'dashboard':
        return (
          <DashboardLayout 
            user={user}
            data={uploadedData}
            onLogout={handleLogout}
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