import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2,
  Eye,
  Package
} from 'lucide-react';
import { productServices } from '../api';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [products, setProducts] = useState([]);
 
  // Mock products data
  // const products = [
  //   {
  //     id: 1,
  //     title: 'Wireless Bluetooth Headphones',
  //     description: 'High-quality wireless headphones with noise cancellation',
  //     slug: 'wireless-bluetooth-headphones',
  //     price: 99.99,
  //     stock: 45,
  //     mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
  //     category: 'Electronics',
  //     status: 'active',
  //     variants: [
  //       { color: 'Black', size: 'M', stock: 20 },
  //       { color: 'White', size: 'M', stock: 15 },
  //       { color: 'Black', size: 'L', stock: 10 }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     title: 'Smart Fitness Watch',
  //     description: 'Advanced fitness tracking with heart rate monitor',
  //     slug: 'smart-fitness-watch',
  //     price: 199.99,
  //     stock: 32,
  //     mainImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
  //     category: 'Electronics',
  //     status: 'active',
  //     variants: [
  //       { color: 'Silver', size: 'S', stock: 12 },
  //       { color: 'Black', size: 'M', stock: 20 }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     title: 'Ergonomic Laptop Stand',
  //     description: 'Adjustable laptop stand for better posture',
  //     slug: 'ergonomic-laptop-stand',
  //     price: 49.99,
  //     stock: 78,
  //     mainImg: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
  //     category: 'Accessories',
  //     status: 'active',
  //     variants: [
  //       { color: 'Aluminum', size: 'Standard', stock: 78 }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     title: 'Portable Bluetooth Speaker',
  //     description: 'Waterproof portable speaker with 20-hour battery life',
  //     slug: 'portable-bluetooth-speaker',
  //     price: 79.99,
  //     stock: 0,
  //     mainImg: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
  //     category: 'Electronics',
  //     status: 'inactive',
  //     variants: [
  //       { color: 'Blue', size: 'Standard', stock: 0 }
  //     ]
  //   }
  // ];
  
  useEffect(()=>{
    (async ()=>{
      const data = await productServices.getAllProducts();
      setProducts(data.products);
    })()
  },[])
  
 console.log(products);
 
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Link
          to="/products/add"
          className="btn-primary inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
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
            
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Categories</option>
            
          </select>
          
          <button className="btn-secondary inline-flex items-center justify-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product?._id} className="card group">
            <div className="relative">
              <img
                src={product?.mainImg}
                alt={product?.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-2 right-2">
                <div className="relative">
                  <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                  <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-32 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/products/${product?.slug}`}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                    <Link
                      to={`/products/${product?.slug}/edit`}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <Link to="/products/add" className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
};

export default Products; 