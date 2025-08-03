import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  Star
} from 'lucide-react';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock customer data
  const customer = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    status: 'active',
    totalOrders: 5,
    totalSpent: 1250.50,
    avgOrderValue: 250.10,
    lastOrder: '2024-01-15',
    joinedDate: '2023-06-15',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    preferences: {
      favoriteCategory: 'Electronics',
      preferredPayment: 'Credit Card',
      newsletter: true
    }
  };

  // Mock order history
  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'processing',
      total: 431.97,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'delivered',
      total: 299.99,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'delivered',
      total: 199.99,
      items: 1
    },
    {
      id: 'ORD-004',
      date: '2023-12-28',
      status: 'delivered',
      total: 159.99,
      items: 2
    },
    {
      id: 'ORD-005',
      date: '2023-12-15',
      status: 'delivered',
      total: 158.56,
      items: 1
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getOrderStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/customers')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <p className="text-gray-600">Customer details and history</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(customer.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Customer Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-gray-900">{customer.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-gray-900">{customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-gray-900">{customer.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Joined Date</p>
                    <p className="text-gray-900">{formatDate(customer.joinedDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Order</p>
                    <p className="text-gray-900">{formatDate(customer.lastOrder)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    {getStatusBadge(customer.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="space-y-1">
                <p className="text-gray-900">{customer.address.street}</p>
                <p className="text-gray-900">
                  {customer.address.city}, {customer.address.state} {customer.address.zipCode}
                </p>
                <p className="text-gray-900">{customer.address.country}</p>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order History</h3>
            
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{order.id}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{formatDate(order.date)}</span>
                        <span>•</span>
                        <span>{order.items} items</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      {getOrderStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats & Preferences */}
        <div className="space-y-6">
          {/* Customer Avatar */}
          <div className="card">
            <div className="text-center">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="h-24 w-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">Total Orders</span>
                </div>
                <span className="font-medium text-gray-900">{customer.totalOrders}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Total Spent</span>
                </div>
                <span className="font-medium text-gray-900">${customer.totalSpent.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-600">Avg Order Value</span>
                </div>
                <span className="font-medium text-gray-900">${customer.avgOrderValue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Preferences */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Favorite Category</p>
                <p className="text-gray-900">{customer.preferences.favoriteCategory}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Preferred Payment</p>
                <p className="text-gray-900">{customer.preferences.preferredPayment}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Newsletter Subscription</p>
                <p className="text-gray-900">
                  {customer.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                { action: 'Order placed', time: '2 hours ago', order: 'ORD-001' },
                { action: 'Payment processed', time: '2 hours ago', order: 'ORD-001' },
                { action: 'Order delivered', time: '5 days ago', order: 'ORD-002' },
                { action: 'Profile updated', time: '1 week ago', order: null },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {activity.order ? `Order: ${activity.order} • ` : ''}{activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full btn-primary">
                Send Email
              </button>
              <button className="w-full btn-secondary">
                Edit Customer
              </button>
              <button className="w-full btn-secondary">
                View Orders
              </button>
              <button className="w-full btn-danger">
                Suspend Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails; 