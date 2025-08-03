import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard,
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Receipt
} from 'lucide-react';

const PaymentDetails = () => {
  const navigate = useNavigate();

  // Mock payment data
  const payment = {
    id: 'pi_1234567890',
    orderId: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    amount: 431.97,
    currency: 'USD',
    status: 'succeeded',
    paymentMethod: 'card',
    cardLast4: '4242',
    cardBrand: 'visa',
    cardExpiry: '12/25',
    cardHolder: 'John Doe',
    billingAddress: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-01-15 10:35:00',
    updatedAt: '2024-01-15 10:35:00',
    processedAt: '2024-01-15 10:35:30',
    refundedAt: null,
    refundAmount: 0,
    transactionId: 'txn_1234567890',
    gateway: 'stripe',
    gatewayResponse: {
      status: 'succeeded',
      message: 'Payment processed successfully',
      code: '200'
    },
    timeline: [
      {
        action: 'Payment Succeeded',
        timestamp: '2024-01-15 10:35:30',
        type: 'success',
        description: 'Payment processed by Stripe'
      },
      {
        action: 'Payment Processing',
        timestamp: '2024-01-15 10:35:00',
        type: 'processing',
        description: 'Payment initiated'
      },
      {
        action: 'Payment Created',
        timestamp: '2024-01-15 10:34:45',
        type: 'create',
        description: 'Payment intent created'
      }
    ]
  };

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

  const getTimelineIcon = (type) => {
    const icons = {
      create: <CreditCard className="h-4 w-4" />,
      processing: <Clock className="h-4 w-4" />,
      success: <CheckCircle className="h-4 w-4" />,
      failed: <XCircle className="h-4 w-4" />
    };
    return icons[type] || <Clock className="h-4 w-4" />;
  };

  const getTimelineColor = (type) => {
    const colors = {
      create: 'bg-blue-500',
      processing: 'bg-yellow-500',
      success: 'bg-green-500',
      failed: 'bg-red-500'
    };
    return colors[type] || 'bg-gray-500';
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/payments')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment {payment.id}</h1>
            <p className="text-gray-600">Payment transaction details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(payment.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Payment Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Customer</p>
                  <p className="text-gray-900">{payment.customer.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-gray-900">{payment.customer.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-gray-900">{payment.customer.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Receipt className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Order ID</p>
                  <p className="text-gray-900">{payment.orderId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Card Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {getCardBrandIcon(payment.cardBrand)}
                    <div>
                      <p className="text-sm text-gray-600">Card Number</p>
                      <p className="text-gray-900">•••• •••• •••• {payment.cardLast4}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Cardholder</p>
                      <p className="text-gray-900">{payment.cardHolder}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expires</p>
                      <p className="text-gray-900">{payment.cardExpiry}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Transaction Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-lg font-bold text-gray-900">${payment.amount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Currency</span>
                    <span className="text-gray-900">{payment.currency}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Gateway</span>
                    <span className="text-gray-900 capitalize">{payment.gateway}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transaction ID</span>
                    <span className="text-gray-900 font-mono text-sm">{payment.transactionId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
            
            <div className="space-y-2">
              <p className="text-gray-900">{payment.billingAddress.street}</p>
              <p className="text-gray-900">
                {payment.billingAddress.city}, {payment.billingAddress.state} {payment.billingAddress.zipCode}
              </p>
              <p className="text-gray-900">{payment.billingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Summary</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="text-lg font-bold text-gray-900">${payment.amount.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Currency</span>
                <span className="text-gray-900">{payment.currency}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="text-gray-900 capitalize">{payment.paymentMethod}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">${payment.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Timeline */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Timeline</h3>
            
            <div className="space-y-4">
              {payment.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`h-2 w-2 ${getTimelineColor(event.type)} rounded-full mt-2`}></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getTimelineIcon(event.type)}
                      <p className="text-sm font-medium text-gray-900">{event.action}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(event.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gateway Response */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Gateway Response</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  payment.gatewayResponse.status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {payment.gatewayResponse.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Code</span>
                <span className="text-gray-900">{payment.gatewayResponse.code}</span>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Message</span>
                <p className="text-gray-900 text-sm mt-1">{payment.gatewayResponse.message}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full btn-primary inline-flex items-center justify-center">
                <Receipt className="h-4 w-4 mr-2" />
                Download Receipt
              </button>
              <button className="w-full btn-secondary inline-flex items-center justify-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Order
              </button>
              {payment.status === 'succeeded' && (
                <button className="w-full btn-danger inline-flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Refund Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails; 