import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User,
  ShoppingCart,
  Package,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Send,
  MessageCircle,
  Trash2,
  Eye,
  Clock,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const CartDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  // Mock cart data
  const cart = {
    id: 1,
    userId: 'user_001',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '+1 (555) 123-4567',
    items: [
      {
        productId: 1,
        title: 'Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
        quantity: 2,
        price: 99.99,
        variants: { color: 'Black', size: 'M' }
      },
      {
        productId: 2,
        title: 'Smart Fitness Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
        quantity: 1,
        price: 199.99,
        variants: { color: 'Silver', size: 'M' }
      },
      {
        productId: 3,
        title: 'Ergonomic Laptop Stand',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
        quantity: 1,
        price: 49.99,
        variants: { color: 'Aluminum', size: 'Standard' }
      }
    ],
    totalItems: 4,
    subtotal: 449.96,
    tax: 36.00,
    shipping: 0.00,
    totalPrice: 485.96,
    status: 'active',
    createdAt: '2024-01-15 10:30:00',
    lastUpdated: '2024-01-15 14:20:00',
    abandonedAt: null,
    recoveryEmailsSent: 1,
    lastRecoveryEmail: '2024-01-15 12:00:00',
    shippingAddress: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    timeline: [
      {
        action: 'Cart Updated',
        timestamp: '2024-01-15 14:20:00',
        type: 'update',
        description: 'Customer added Ergonomic Laptop Stand'
      },
      {
        action: 'Recovery Email Sent',
        timestamp: '2024-01-15 12:00:00',
        type: 'email',
        description: 'Abandoned cart recovery email sent'
      },
      {
        action: 'Items Added',
        timestamp: '2024-01-15 11:15:00',
        type: 'add',
        description: 'Customer added Smart Fitness Watch'
      },
      {
        action: 'Cart Created',
        timestamp: '2024-01-15 10:30:00',
        type: 'create',
        description: 'Customer started shopping'
      }
    ]
  };

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

  const getTimelineIcon = (type) => {
    const icons = {
      create: <ShoppingCart className="h-4 w-4" />,
      add: <Package className="h-4 w-4" />,
      update: <CheckCircle className="h-4 w-4" />,
      email: <Mail className="h-4 w-4" />
    };
    return icons[type] || <Clock className="h-4 w-4" />;
  };

  const getTimelineColor = (type) => {
    const colors = {
      create: 'bg-gray-500',
      add: 'bg-blue-500',
      update: 'bg-green-500',
      email: 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
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

  const handleSendRecoveryEmail = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Recovery email sent successfully!');
      setShowRecoveryModal(false);
    } catch (error) {
      toast.error('Failed to send recovery email');
    } finally {
      setLoading(false);
    }
  };

  const handleContactCustomer = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Customer contacted successfully!');
      setShowContactModal(false);
    } catch (error) {
      toast.error('Failed to contact customer');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Cart cleared successfully!');
      setShowClearModal(false);
      navigate('/carts');
    } catch (error) {
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText, loading }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                  <div className="mt-2">
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {loading ? 'Processing...' : confirmText}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/carts')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cart #{cart.id}</h1>
            <p className="text-gray-600">Shopping cart details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(cart.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Customer</p>
                  <p className="text-gray-900">{cart.userName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-gray-900">{cart.userEmail}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-gray-900">{cart.userPhone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Created</p>
                  <p className="text-gray-900">{formatDate(cart.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Recovery Email Info */}
            {cart.recoveryEmailsSent > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Recovery email sent {cart.recoveryEmailsSent} time(s)
                  </span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Last sent: {formatDate(cart.lastRecoveryEmail)}
                </p>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cart Items ({cart.totalItems})</h3>
            
            <div className="space-y-4">
              {cart.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>Qty: {item.quantity}</span>
                      <span>•</span>
                      <span>Color: {item.variants.color}</span>
                      <span>•</span>
                      <span>Size: {item.variants.size}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)} total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
            
            <div className="space-y-2">
              <p className="text-gray-900">{cart.shippingAddress.street}</p>
              <p className="text-gray-900">
                {cart.shippingAddress.city}, {cart.shippingAddress.state} {cart.shippingAddress.zipCode}
              </p>
              <p className="text-gray-900">{cart.shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                <span className="text-gray-900">${cart.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${cart.tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {cart.shipping === 0 ? 'Free' : `$${cart.shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">${cart.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Timeline */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cart Timeline</h3>
            
            <div className="space-y-4">
              {cart.timeline.map((event, index) => (
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

          {/* Actions */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => setShowRecoveryModal(true)}
                className="w-full btn-primary inline-flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Recovery Email
              </button>
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full btn-secondary inline-flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Customer
              </button>
              <button 
                onClick={() => setShowClearModal(true)}
                className="w-full btn-danger inline-flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recovery Email Modal */}
      <Modal
        isOpen={showRecoveryModal}
        onClose={() => setShowRecoveryModal(false)}
        title="Send Recovery Email"
        confirmText="Send Email"
        onConfirm={handleSendRecoveryEmail}
        loading={loading}
      >
        <p className="text-sm text-gray-500">
          This will send an abandoned cart recovery email to {cart.userEmail}. 
          The email will include a link to complete their purchase.
        </p>
      </Modal>

      {/* Contact Customer Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contact Customer"
        confirmText="Contact"
        onConfirm={handleContactCustomer}
        loading={loading}
      >
        <p className="text-sm text-gray-500">
          This will initiate contact with {cart.userName} via email or phone 
          to follow up on their abandoned cart.
        </p>
      </Modal>

      {/* Clear Cart Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Cart"
        confirmText="Clear Cart"
        onConfirm={handleClearCart}
        loading={loading}
      >
        <p className="text-sm text-gray-500">
          This will permanently clear all items from this cart. 
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default CartDetails; 