import { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Eye,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for sales chart
  const salesData = [
    { date: 'Mon', sales: 1200 },
    { date: 'Tue', sales: 1800 },
    { date: 'Wed', sales: 1400 },
    { date: 'Thu', sales: 2200 },
    { date: 'Fri', sales: 1900 },
    { date: 'Sat', sales: 2800 },
    { date: 'Sun', sales: 2400 },
  ];

  // Mock data for best-selling products
  const bestSellingProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      sales: 245,
      revenue: 12250,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      sales: 189,
      revenue: 18900,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Laptop Stand',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
      sales: 156,
      revenue: 4680,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
      sales: 134,
      revenue: 5360,
      rating: 4.5
    }
  ];

  const stats = [
    {
      name: 'Total Sales',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      name: 'Total Customers',
      value: '2,350',
      change: '+180.1%',
      changeType: 'positive',
      icon: Users
    },
    {
      name: 'Daily Orders',
      value: '12,234',
      change: '+19%',
      changeType: 'positive',
      icon: ShoppingBag
    },
    {
      name: 'Conversion Rate',
      value: '2.4%',
      change: '+4.75%',
      changeType: 'positive',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`inline-flex items-center text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Best Selling Products</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
          </div>
          <div className="space-y-4">
            {bestSellingProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{product.sales} sold</span>
                    <span>•</span>
                    <span>${product.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New order received', time: '2 minutes ago', user: 'John Doe' },
            { action: 'Payment processed', time: '5 minutes ago', user: 'Jane Smith' },
            { action: 'Product updated', time: '10 minutes ago', user: 'Mike Johnson' },
            { action: 'New customer registered', time: '15 minutes ago', user: 'Sarah Wilson' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-primary-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 