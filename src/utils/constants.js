// Color palette for charts
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// Navigation items for sidebar
export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
  { id: 'chatbot', label: 'Chatbot', icon: 'MessageCircle' },
  { id: 'profit', label: 'Profit Analysis', icon: 'DollarSign' },
  { id: 'amazon', label: 'Amazon Integration', icon: 'ShoppingBag' },
  { id: 'shopify', label: 'Shopify Integration', icon: 'Package' }
];

// Sample data for demo purposes
export const SAMPLE_DATA = [
  { 
    id: 1, 
    productName: 'iPhone 15', 
    sales: 125000, 
    profit: 25000, 
    te: 5000, 
    credit: 2000, 
    amazonFee: 3000, 
    profitPercentage: 20 
  },
  { 
    id: 2, 
    productName: 'Samsung Galaxy S24', 
    sales: 98000, 
    profit: 18000, 
    te: 4500, 
    credit: 1500, 
    amazonFee: 2800, 
    profitPercentage: 18.4 
  },
  { 
    id: 3, 
    productName: 'MacBook Pro', 
    sales: 245000, 
    profit: 45000, 
    te: 8000, 
    credit: 3000, 
    amazonFee: 5500, 
    profitPercentage: 18.4 
  },
  { 
    id: 4, 
    productName: 'Dell XPS 13', 
    sales: 89000, 
    profit: 15000, 
    te: 3500, 
    credit: 1200, 
    amazonFee: 2100, 
    profitPercentage: 16.9 
  },
  { 
    id: 5, 
    productName: 'iPad Pro', 
    sales: 156000, 
    profit: 28000, 
    te: 6000, 
    credit: 2200, 
    amazonFee: 3800, 
    profitPercentage: 17.9 
  }
];

// Required CSV columns
export const REQUIRED_COLUMNS = [
  'Product Name', 
  'Sales', 
  'Profit', 
  'TE', 
  'Credit', 
  'Amazon Fee', 
  'Profit Percentage'
];