import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package,
  Eye,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock category data
  const category = {
    id: 1,
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
    description: 'Electronic devices and gadgets including smartphones, laptops, headphones, and other tech accessories.',
    productCount: 45,
    status: 'active',
    totalRevenue: 125000,
    avgRating: 4.6,
    createdAt: '2024-01-15'
  };

  // Mock products in this category
  const products = [
    {
      id: 1,
      title: 'Wireless Bluetooth Headphones',
      price: 99.99,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      sales: 245,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Smart Fitness Watch',
      price: 199.99,
      stock: 32,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      sales: 189,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Portable Bluetooth Speaker',
      price: 79.99,
      stock: 0,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
      sales: 134,
      rating: 4.5
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/categories')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600">Category details and management</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary inline-flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button className="btn-danger inline-flex items-center">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Category Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Information</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{category.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  {getStatusBadge(category.status)}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created Date</label>
                  <p className="text-gray-900">{category.createdAt}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Products</label>
                  <p className="text-gray-900">{category.productCount}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Average Rating</label>
                  <p className="text-gray-900">{category.avgRating}/5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products in Category */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Products in Category</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
            </div>
            
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>${product.price}</span>
                      <span>•</span>
                      <span>Stock: {product.stock}</span>
                      <span>•</span>
                      <span>{product.sales} sold</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{product.rating}/5</span>
                    <Link
                      to={`/products/${product.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          {/* Category Image */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Image</h3>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Performance Stats */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">Total Products</span>
                </div>
                <span className="font-medium text-gray-900">{category.productCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Total Revenue</span>
                </div>
                <span className="font-medium text-gray-900">${category.totalRevenue.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-600">Avg Rating</span>
                </div>
                <span className="font-medium text-gray-900">{category.avgRating}/5</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                { action: 'Product added to category', time: '2 hours ago', product: 'Smart Watch' },
                { action: 'Category updated', time: '1 day ago', product: 'Admin' },
                { action: 'Product removed from category', time: '3 days ago', product: 'Old Headphones' },
                { action: 'Category created', time: '1 week ago', product: 'Admin' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.product} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails; 