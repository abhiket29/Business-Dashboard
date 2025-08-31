import React from 'react';

/**
 * Reusable metric card component
 * @param {Object} props 
 * @returns {JSX.Element}
 */
const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  iconColor = 'blue',
  valueColor = 'gray'
}) => {
  const getIconBgColor = () => {
    const colors = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      red: 'bg-red-100',
      yellow: 'bg-yellow-100',
      purple: 'bg-purple-100',
      orange: 'bg-orange-100'
    };
    return colors[iconColor] || colors.blue;
  };

  const getIconTextColor = () => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colors[iconColor] || colors.blue;
  };

  const getValueTextColor = () => {
    const colors = {
      gray: 'text-gray-900',
      green: 'text-green-600',
      blue: 'text-blue-600',
      red: 'text-red-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colors[valueColor] || colors.gray;
  };

  const getTrendColor = () => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${getValueTextColor()}`}>
            {value}
          </p>
        </div>
        {Icon && (
          <div className={`w-12 h-12 ${getIconBgColor()} rounded-full flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${getIconTextColor()}`} />
          </div>
        )}
      </div>
      {change && (
        <div className={`mt-2 flex items-center text-sm ${getTrendColor()}`}>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;