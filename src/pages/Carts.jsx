import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye,
  ShoppingCart,
  User,
  DollarSign,
  Package
} from 'lucide-react';

const Carts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock carts data
  const carts = [
    {
      id: 1,
      userId: 'user_001',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      items: [
        { productId: 1, title: 'Wireless Headphones', quantity: 2, price: 99.99 },
        { productId: 2, title: 'Smart Watch', quantity: 1, price: 199.99 }
      ],
      totalItems: 3,
      totalPrice: 399.97,
      status: 'active',
      createdAt: '2024-01-15 10:30:00',
      lastUpdated: '2024-01-15 14:20:00'
    },
    {
      id: 2,
      userId: 'user_002',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      items: [
        { productId: 3, title: 'Laptop Stand', quantity: 1, price: 49.99 }
      ],
      totalItems: 1,
      totalPrice: 49.99,
      status: 'abandoned',
      createdAt: '2024-01-14 16:45:00',
      lastUpdated: '2024-01-14 16:45:00'
    },
    {
      id: 3,
      userId: 'user_003',
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      items: [
        { productId: 1, title: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { productId: 4, title: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
        { productId: 5, title: 'Phone Case', quantity: 2, price: 19.99 }
      ],
      totalItems: 4,
      totalPrice: 219.96,
      status: 'active',
      createdAt: '2024-01-15 09:15:00',
      lastUpdated: '2024-01-15 11:30:00'
    },
    {
      id: 4,
      userId: 'user_004',
      userName: 'Sarah Wilson',
      userEmail: 'sarah@example.com',
      items: [
        { productId: 2, title: 'Smart Watch', quantity: 1, price: 199.99 }
      ],
      totalItems: 1,
      totalPrice: 199.99,
      status: 'converted',
      createdAt: '2024-01-13 12:00:00',
      lastUpdated: '2024-01-13 12:00:00'
    }
  ];

  const statuses = ['active', 'abandoned', 'converted'];

  const filteredCarts = carts.filter(cart => {
    const matchesSearch = cart.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cart.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cart.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-blue-100 text-blue-800',
      abandoned: 'bg-red-100 text-red-800',
      converted: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Carts</h1>
          <p className="text-gray-600">Monitor customer shopping carts and abandoned carts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          
          <button className="btn-secondary inline-flex items-center justify-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Carts List */}
      <div className="space-y-4">
        {filteredCarts.map((cart) => (
          <div key={cart.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">{cart.userName}</h3>
                    {getStatusBadge(cart.status)}
                  </div>
                  <p className="text-sm text-gray-500">{cart.userEmail}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>Cart ID: #{cart.id}</span>
                    <span>•</span>
                    <span>Created: {formatDate(cart.createdAt)}</span>
                    <span>•</span>
                    <span>Updated: {formatDate(cart.lastUpdated)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${cart.totalPrice.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{cart.totalItems} items</p>
                </div>
                
                <Link
                  to={`/carts/${cart.id}`}
                  className="btn-primary inline-flex items-center text-sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </div>
            </div>
            
            {/* Cart Items Preview */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Items in Cart:</h4>
              <div className="space-y-2">
                {cart.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{item.title}</span>
                      <span className="text-gray-500">× {item.quantity}</span>
                    </div>
                    <span className="text-gray-900">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCarts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No carts found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingCart className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Carts</p>
              <p className="text-2xl font-bold text-gray-900">{carts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Carts</p>
              <p className="text-2xl font-bold text-gray-900">
                {carts.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingCart className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Abandoned Carts</p>
              <p className="text-2xl font-bold text-gray-900">
                {carts.filter(c => c.status === 'abandoned').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${carts.reduce((sum, c) => sum + c.totalPrice, 0).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts; 