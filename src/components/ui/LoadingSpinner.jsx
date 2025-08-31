import React from 'react';

/**
 * Reusable loading spinner component
 * @param {Object} props 
 * @returns {JSX.Element}
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = 'Loading...',
  className = '' 
}) => {
  const getSizeClasses = () => {
    const sizes = {
      sm: 'h-6 w-6',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-20 w-20'
    };
    return sizes[size] || sizes.md;
  };

  const getColorClasses = () => {
    const colors = {
      blue: 'border-blue-600',
      green: 'border-green-600',
      red: 'border-red-600',
      purple: 'border-purple-600',
      indigo: 'border-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div 
        className={`animate-spin rounded-full border-b-2 ${getSizeClasses()} ${getColorClasses()}`}
      />
      {text && (
        <p className="text-lg font-medium text-gray-700">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;