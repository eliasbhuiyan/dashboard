import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Clock,
  Shield,
  Edit,
  Save,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  BadgeCheck,
  Activity,
  Settings,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Mock employee data
  const [employee, setEmployee] = useState({
    id: id,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    role: 'Admin',
    department: 'Management',
    status: 'active',
    location: 'New York, NY',
    hireDate: '2023-01-15',
    lastActive: '2024-01-15 10:30:00',
    manager: null,
    salary: 85000,
    permissions: [
      { name: 'Dashboard', key: 'dashboard', enabled: true },
      { name: 'Products', key: 'products', enabled: true },
      { name: 'Categories', key: 'categories', enabled: true },
      { name: 'Orders', key: 'orders', enabled: true },
      { name: 'Customers', key: 'customers', enabled: true },
      { name: 'Employees', key: 'employees', enabled: true },
      { name: 'Analytics', key: 'analytics', enabled: true },
      { name: 'Settings', key: 'settings', enabled: true }
    ],
    activity: [
      { action: 'Logged in', timestamp: '2024-01-15 10:30:00', type: 'login' },
      { action: 'Updated product', timestamp: '2024-01-15 09:15:00', type: 'update' },
      { action: 'Viewed customer details', timestamp: '2024-01-15 08:45:00', type: 'view' },
      { action: 'Logged out', timestamp: '2024-01-14 17:30:00', type: 'logout' },
      { action: 'Created new order', timestamp: '2024-01-14 14:20:00', type: 'create' }
    ],
    performance: {
      tasksCompleted: 45,
      efficiency: 92,
      customerSatisfaction: 4.8,
      lastReview: '2023-12-15'
    }
  });

  const [editData, setEditData] = useState({});

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEditData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
        department: employee.department,
        status: employee.status,
        location: employee.location,
        salary: employee.salary
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (permissionKey) => {
    setEmployee(prev => ({
      ...prev,
      permissions: prev.permissions.map(perm => 
        perm.key === permissionKey 
          ? { ...perm, enabled: !perm.enabled }
          : perm
      )
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setEmployee(prev => ({ ...prev, ...editData }));
      setEditing(false);
      toast.success('Employee information updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleStatusChange = (newStatus) => {
    setEmployee(prev => ({ ...prev, status: newStatus }));
    toast.success(`Employee status updated to ${newStatus}`);
  };

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

  const getRoleBadge = (role) => {
    const roleClasses = {
      Admin: 'bg-purple-100 text-purple-800',
      Manager: 'bg-blue-100 text-blue-800',
      Support: 'bg-green-100 text-green-800',
      Analyst: 'bg-yellow-100 text-yellow-800',
      Developer: 'bg-indigo-100 text-indigo-800',
      Designer: 'bg-pink-100 text-pink-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleClasses[role] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </span>
    );
  };

  const getActivityIcon = (type) => {
    const icons = {
      login: CheckCircle,
      logout: XCircle,
      create: Activity,
      update: Edit,
      view: Eye
    };
    const Icon = icons[type] || Activity;
    return <Icon className="h-4 w-4" />;
  };

  const getActivityColor = (type) => {
    const colors = {
      login: 'text-green-600',
      logout: 'text-gray-600',
      create: 'text-blue-600',
      update: 'text-yellow-600',
      view: 'text-purple-600'
    };
    return colors[type] || 'text-gray-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/employees')} className="p-2 text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
            <p className="text-gray-600">View and manage employee information</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {editing ? (
            <>
              <button onClick={() => setEditing(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading} className="btn-primary inline-flex items-center">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="btn-secondary inline-flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button className="btn-danger inline-flex items-center">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Employee Overview */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              <img
                src={employee.avatar}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="h-24 w-24 rounded-full object-cover mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {employee.firstName} {employee.lastName}
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-2">
                {getRoleBadge(employee.role)}
                {getStatusBadge(employee.status)}
              </div>
              <p className="text-sm text-gray-500 mb-4">{employee.department}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{employee.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{employee.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{employee.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Hired {formatDate(employee.hireDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="card mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                <span className="text-lg font-bold text-gray-900">{employee.performance.tasksCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Efficiency</span>
                <span className="text-lg font-bold text-gray-900">{employee.performance.efficiency}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                <span className="text-lg font-bold text-gray-900">{employee.performance.customerSatisfaction}/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Review</span>
                <span className="text-sm text-gray-900">{formatDate(employee.performance.lastReview)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              {!editing && (
                <button onClick={() => setEditing(true)} className="text-primary-600 hover:text-primary-700">
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {editing ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={editData.role}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Support">Support</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    name="department"
                    value={editData.department}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editData.location}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={editData.salary}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-gray-900">{employee.firstName} {employee.lastName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-gray-900">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-gray-900">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Location</p>
                  <p className="text-gray-900">{employee.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Salary</p>
                  <p className="text-gray-900">${employee.salary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Manager</p>
                  <p className="text-gray-900">{employee.manager || 'None'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Permissions */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {employee.permissions.map((permission) => (
                <div key={permission.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                    <p className="text-xs text-gray-500">{permission.key}</p>
                  </div>
                  <button
                    onClick={() => handlePermissionToggle(permission.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      permission.enabled ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        permission.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {employee.activity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`h-2 w-2 ${getActivityColor(activity.type)} rounded-full mt-2`}></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getActivityIcon(activity.type)}
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{formatDateTime(activity.timestamp)}</p>
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

export default EmployeeDetails; 