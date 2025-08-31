// Helper functions for data processing and formatting

/**
 * Format number as currency
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number with commas
 * @param {number} number 
 * @returns {string}
 */
export const formatNumber = (number) => {
  return number.toLocaleString();
};

/**
 * Calculate total from array of objects
 * @param {Array} data 
 * @param {string} field 
 * @returns {number}
 */
export const calculateTotal = (data, field) => {
  return data.reduce((sum, item) => sum + (item[field] || 0), 0);
};

/**
 * Calculate average from array of objects
 * @param {Array} data 
 * @param {string} field 
 * @returns {number}
 */
export const calculateAverage = (data, field) => {
  if (data.length === 0) return 0;
  return calculateTotal(data, field) / data.length;
};

/**
 * Get profit status color based on percentage
 * @param {number} percentage 
 * @returns {string}
 */
export const getProfitStatusColor = (percentage) => {
  if (percentage > 18) return 'bg-green-100 text-green-800';
  if (percentage > 15) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

/**
 * Get order status color
 * @param {string} status 
 * @returns {string}
 */
export const getOrderStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
    case 'fulfilled':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Process raw data to ensure all required fields exist
 * @param {Array} rawData 
 * @returns {Array}
 */
export const processUploadedData = (rawData) => {
  return rawData.map((row, index) => ({
    id: index + 1,
    productName: row['Product Name'] || row.productName || 'Unknown Product',
    sales: parseFloat(row['Sales'] || row.sales || 0),
    profit: parseFloat(row['Profit'] || row.profit || 0),
    te: parseFloat(row['TE'] || row.te || 0),
    credit: parseFloat(row['Credit'] || row.credit || 0),
    amazonFee: parseFloat(row['Amazon Fee'] || row.amazonFee || 0),
    profitPercentage: parseFloat(row['Profit Percentage'] || row.profitPercentage || 0)
  }));
};

/**
 * Prepare data for charts
 * @param {Array} data 
 * @returns {Object}
 */
export const prepareChartData = (data) => {
  const barChartData = data.map(item => ({
    name: item.productName,
    sales: item.sales,
    profit: item.profit,
    expenses: item.te + item.amazonFee
  }));

  const pieData = [
    { name: 'Sales', value: calculateTotal(data, 'sales') },
    { name: 'Profit', value: calculateTotal(data, 'profit') },
    { name: 'Expenses', value: data.reduce((sum, item) => sum + (item.te + item.amazonFee), 0) }
  ];

  return { barChartData, pieData };
};

/**
 * Generate mock performance data for trends
 * @param {Object} product 
 * @returns {Array}
 */
export const generateTrendData = (product) => {
  return [
    { month: 'Jan', sales: Math.round(product.sales * 0.8), profit: Math.round(product.profit * 0.7) },
    { month: 'Feb', sales: Math.round(product.sales * 0.9), profit: Math.round(product.profit * 0.85) },
    { month: 'Mar', sales: Math.round(product.sales * 0.95), profit: Math.round(product.profit * 0.9) },
    { month: 'Apr', sales: product.sales, profit: product.profit },
    { month: 'May', sales: Math.round(product.sales * 1.1), profit: Math.round(product.profit * 1.05) },
    { month: 'Jun', sales: Math.round(product.sales * 1.2), profit: Math.round(product.profit * 1.15) }
  ];
};