import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye,
  Users,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  Plus,
  BadgeCheck,
  Clock,
  AlertCircle
} from 'lucide-react';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock employees data
  const employees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      role: 'Admin',
      department: 'Management',
      status: 'active',
      location: 'New York, NY',
      hireDate: '2023-01-15',
      lastActive: '2024-01-15 10:30:00',
      permissions: ['dashboard', 'products', 'orders', 'customers', 'employees'],
      manager: null
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      role: 'Manager',
      department: 'Sales',
      status: 'active',
      location: 'Los Angeles, CA',
      hireDate: '2023-03-20',
      lastActive: '2024-01-15 09:15:00',
      permissions: ['dashboard', 'products', 'orders', 'customers'],
      manager: 'John Doe'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      role: 'Support',
      department: 'Customer Service',
      status: 'active',
      location: 'Chicago, IL',
      hireDate: '2023-06-10',
      lastActive: '2024-01-15 08:45:00',
      permissions: ['dashboard', 'orders', 'customers'],
      manager: 'Jane Smith'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 321-0987',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      role: 'Analyst',
      department: 'Analytics',
      status: 'active',
      location: 'Miami, FL',
      hireDate: '2023-08-05',
      lastActive: '2024-01-14 17:30:00',
      permissions: ['dashboard', 'analytics'],
      manager: 'John Doe'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@company.com',
      phone: '+1 (555) 654-3210',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      role: 'Developer',
      department: 'Engineering',
      status: 'inactive',
      location: 'Seattle, WA',
      hireDate: '2023-02-15',
      lastActive: '2024-01-10 14:20:00',
      permissions: ['dashboard', 'products'],
      manager: 'John Doe'
    },
    {
      id: 6,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 789-0123',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      role: 'Designer',
      department: 'Design',
      status: 'active',
      location: 'Austin, TX',
      hireDate: '2023-09-12',
      lastActive: '2024-01-15 11:00:00',
      permissions: ['dashboard', 'products'],
      manager: 'Jane Smith'
    }
  ];

  const departments = ['Management', 'Sales', 'Customer Service', 'Analytics', 'Engineering', 'Design'];
  const statuses = ['active', 'inactive', 'suspended'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm);
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLastActiveStatus = (lastActive) => {
    const now = new Date();
    const lastActiveDate = new Date(lastActive);
    const diffInHours = (now - lastActiveDate) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return { text: 'Online', color: 'text-green-600' };
    if (diffInHours < 24) return { text: 'Today', color: 'text-blue-600' };
    if (diffInHours < 48) return { text: 'Yesterday', color: 'text-yellow-600' };
    return { text: formatDateTime(lastActive), color: 'text-gray-500' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage your team members and their access</p>
        </div>
        <Link
          to="/employees/add"
          className="btn-primary inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
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

      {/* Employees List */}
      <div className="space-y-4">
        {filteredEmployees.map((employee) => {
          const lastActiveStatus = getLastActiveStatus(employee.lastActive);
          return (
            <div key={employee.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 relative">
                    <img
                      src={employee.avatar}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {employee.status === 'active' && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      {getRoleBadge(employee.role)}
                      {getStatusBadge(employee.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{employee.department}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{employee.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>Hired: {formatDate(employee.hireDate)}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span className={lastActiveStatus.color}>{lastActiveStatus.text}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Manager</p>
                        <p className="text-sm text-gray-900">{employee.manager || 'None'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Permissions</p>
                        <p className="text-sm text-gray-900">{employee.permissions.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/employees/${employee.id}`}
                    className="btn-primary inline-flex items-center text-sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BadgeCheck className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter(e => e.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(employees.map(e => e.department)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Online Now</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter(e => {
                  const lastActive = new Date(e.lastActive);
                  const now = new Date();
                  return (now - lastActive) / (1000 * 60 * 60) < 1;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Employee Activity</h3>
        
        <div className="space-y-4">
          {[
            { action: 'New employee added', employee: 'Emily Davis', time: '2 hours ago' },
            { action: 'Employee status updated', employee: 'David Brown', time: '4 hours ago' },
            { action: 'Permissions updated', employee: 'Mike Johnson', time: '6 hours ago' },
            { action: 'Employee logged in', employee: 'Sarah Wilson', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-primary-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.employee} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Employees; 