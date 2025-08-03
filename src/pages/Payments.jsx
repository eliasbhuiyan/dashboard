import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye,
  CreditCard,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock payments data
  const payments = [
    {
      id: 'pi_1234567890',
      orderId: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      amount: 431.97,
      currency: 'USD',
      status: 'succeeded',
      paymentMethod: 'card',
      cardLast4: '4242',
      cardBrand: 'visa',
      createdAt: '2024-01-15 10:35:00',
      updatedAt: '2024-01-15 10:35:00'
    },
    {
      id: 'pi_1234567891',
      orderId: 'ORD-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      amount: 49.99,
      currency: 'USD',
      status: 'succeeded',
      paymentMethod: 'card',
      cardLast4: '5555',
      cardBrand: 'mastercard',
      createdAt: '2024-01-14 16:50:00',
      updatedAt: '2024-01-14 16:50:00'
    },
    {
      id: 'pi_1234567892',
      orderId: 'ORD-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com'
      },
      amount: 179.98,
      currency: 'USD',
      status: 'succeeded',
      paymentMethod: 'card',
      cardLast4: '1234',
      cardBrand: 'amex',
      createdAt: '2024-01-13 12:05:00',
      updatedAt: '2024-01-13 12:05:00'
    },
    {
      id: 'pi_1234567893',
      orderId: 'ORD-004',
      customer: {
        name: 'Sarah Wilson',
        email: 'sarah@example.com'
      },
      amount: 199.99,
      currency: 'USD',
      status: 'pending',
      paymentMethod: 'card',
      cardLast4: '8888',
      cardBrand: 'visa',
      createdAt: '2024-01-15 08:20:00',
      updatedAt: '2024-01-15 08:20:00'
    },
    {
      id: 'pi_1234567894',
      orderId: 'ORD-005',
      customer: {
        name: 'David Brown',
        email: 'david@example.com'
      },
      amount: 299.99,
      currency: 'USD',
      status: 'failed',
      paymentMethod: 'card',
      cardLast4: '9999',
      cardBrand: 'mastercard',
      createdAt: '2024-01-12 14:30:00',
      updatedAt: '2024-01-12 14:35:00'
    }
  ];

  const statuses = ['succeeded', 'pending', 'failed', 'refunded'];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      succeeded: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCardBrandIcon = (brand) => {
    const brandColors = {
      visa: 'text-blue-600',
      mastercard: 'text-red-600',
      amex: 'text-green-600',
      discover: 'text-orange-600'
    };
    
    return (
      <div className={`w-8 h-5 rounded border ${brandColors[brand] || 'text-gray-600'} flex items-center justify-center text-xs font-bold`}>
        {brand.toUpperCase()}
      </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Monitor payment transactions and processing</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments by ID, customer or order..."
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

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">{payment.id}</h3>
                    {getStatusBadge(payment.status)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {payment.customer.name} • {payment.customer.email}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>Order: {payment.orderId}</span>
                    <span>•</span>
                    <span>{formatDate(payment.createdAt)}</span>
                    <span>•</span>
                    <span>{payment.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${payment.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{payment.currency}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getCardBrandIcon(payment.cardBrand)}
                  <span className="text-sm text-gray-500">•••• {payment.cardLast4}</span>
                </div>
                
                <Link
                  to={`/payments/${payment.id}`}
                  className="btn-primary inline-flex items-center text-sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CreditCard className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${payments.reduce((sum, p) => sum + p.amount, 0).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.filter(p => p.status === 'succeeded').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((payments.filter(p => p.status === 'succeeded').length / payments.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Chart */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Credit Card</span>
            </div>
            <span className="text-sm text-gray-500">
              {payments.filter(p => p.paymentMethod === 'card').length} payments
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-900">PayPal</span>
            </div>
            <span className="text-sm text-gray-500">
              {payments.filter(p => p.paymentMethod === 'paypal').length} payments
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-900">Bank Transfer</span>
            </div>
            <span className="text-sm text-gray-500">
              {payments.filter(p => p.paymentMethod === 'bank_transfer').length} payments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments; 