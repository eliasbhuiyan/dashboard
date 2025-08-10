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
  Tags,
  Package
} from 'lucide-react';
import AddCategory from '../components/AddCategory';
import { useSelector } from 'react-redux';
import { categorySercice } from '../api';

const Categories = () => {
  const userData = useSelector((state)=> state.authSlice.user)
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [categories, setCategories] = useState([])

  const statuses = ['active', 'inactive', 'draft'];

  // const filteredCategories = categories.filter(category => {
  //   const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        category.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    
  //   return matchesSearch && matchesStatus;
  // });

  useEffect(()=>{
    (async()=>{
      const data = await categorySercice.categoryList()
      setCategories(data);
    })()
  })
 
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
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage your product categories</p>
        </div>
        {
          userData.role === "admin" &&
        <button onClick={()=> setAddCategoryModal(true)} className="btn-primary inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
        }
      </div>
      {
        addCategoryModal &&
        <AddCategory stateChane={setAddCategoryModal}/>
      }
      {/* Filters */}
      {/* <div className="card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
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
      </div> */}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category._id} className="card group">
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover object-top rounded-lg mb-4"
              />
              <div className="absolute top-2 right-2">
                <div className="relative">
                  <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                  <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-32 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/categories/${category._id}`}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                {getStatusBadge("Active")}
              </div>
              
              <p className="text-sm text-gray-500">{category?.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  {category?.productCount} products
                </div>
                <Link
                  to={`/categories/${category._id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <Tags className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Category
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Tags className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.length}
              </p>
            </div>
          </div>
        </div>
        
        {/* <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, c) => sum + c.productCount, 0)}
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Categories; 