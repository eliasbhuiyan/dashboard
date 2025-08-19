import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package,
  Tag,
  DollarSign,
  TrendingUp,
  Eye,
  Star
} from 'lucide-react';
import { productServices } from '../api';
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider, Elements, PaymentElement } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';
const stripe = loadStripe('');
const ProductDetails = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [productData, setProductData] = useState({})
  useEffect(()=>{
    (async()=>{
      const data = await productServices.productDetails(slug)
      setProductData(data);
    })()
  },[])
  // Mock product data
  const product = {
    id: 1,
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals who need clear audio quality. Features include 30-hour battery life, quick charging, and comfortable ear cushions.',
    slug: 'wireless-bluetooth-headphones',
    price: 99.99,
    stock: 45,
    mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496957968596-31c8b5a49d39?w=400&h=400&fit=crop'
    ],
    category: 'Electronics',
    status: 'active',
    variants: [
      { color: 'Black', size: 'M', stock: 20, price: 99.99 },
      { color: 'White', size: 'M', stock: 15, price: 99.99 },
      { color: 'Black', size: 'L', stock: 10, price: 109.99 }
    ],
    stats: {
      totalSales: 245,
      revenue: 12250,
      rating: 4.8,
      reviews: 156
    }
  };

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
 const handelOrder = async ()=>{
  const data = await productServices.createOrder(productData)
  setClientSecret(data.clientSecret);
  stripe
          .redirectToCheckout({
            sessionId: data.clientSecret,
          })
  // console.log(data.clientSecret);
  
 }
  const options = {
        clientSecret,
        theme: "stripe",
    };
  return (
    <div className="space-y-6">
      {/* Header */}
      {
        clientSecret && (
            <CheckoutProvider stripe={stripe} options={{clientSecret}}>
      <PaymentElement />
      <button>Submit</button>
    </CheckoutProvider>
        )
      }
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/products')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-gray-600">Product details and management</p>
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
        {/* Product Images */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Images</h3>
            
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
         <button onClick={handelOrder} className='py-2 px-4 bg-green-600 rounded-2xl mt-2 text-white'>Order Now</button>
        </div>
        {/* Product Info */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <p className="text-gray-900">{product.title}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <p className="text-gray-900">{product.stock} units</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-gray-900">{product.category}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  {getStatusBadge(product.status)}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <p className="text-gray-600 text-sm">{product.slug}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Total Sales</span>
                </div>
                <span className="font-medium text-gray-900">{product.stats.totalSales}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <span className="font-medium text-gray-900">${product.stats.revenue.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-600">Rating</span>
                </div>
                <span className="font-medium text-gray-900">{product.stats.rating}/5</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-600">Reviews</span>
                </div>
                <span className="font-medium text-gray-900">{product.stats.reviews}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Variants</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {product.variants.map((variant, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="h-4 w-4 rounded-full mr-2"
                        style={{ backgroundColor: variant.color.toLowerCase() }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{variant.color}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${variant.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      variant.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {variant.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {[
            { action: 'Product updated', time: '2 hours ago', user: 'Admin' },
            { action: 'Stock updated', time: '1 day ago', user: 'System' },
            { action: 'New variant added', time: '3 days ago', user: 'Admin' },
            { action: 'Product created', time: '1 week ago', user: 'Admin' },
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

export default ProductDetails; 